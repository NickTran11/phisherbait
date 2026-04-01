import { auth, db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

function waitForAuthUser() {
  return new Promise((resolve) => {
    if (!auth) {
      resolve(null);
      return;
    }

    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });
}

async function getCurrentUid() {
  const user = await waitForAuthUser();
  return user?.uid || null;
}

function cacheScores(scores) {
  try {
    localStorage.setItem("phisherbait_level_scores", JSON.stringify(scores || {}));
  } catch (error) {
    console.warn("Could not cache scores locally:", error);
  }
}

function getCachedScores() {
  try {
    return JSON.parse(localStorage.getItem("phisherbait_level_scores") || "{}");
  } catch (error) {
    return {};
  }
}

export async function saveBestLevelScore(levelId, newStars) {
  const safeStars = Math.max(0, Math.min(3, Number(newStars) || 0));

  const cached = getCachedScores();
  const cachedBest = Number(cached[levelId] ?? 0);
  const bestFromLocal = Math.max(cachedBest, safeStars);

  cached[levelId] = bestFromLocal;
  cacheScores(cached);

  const uid = await getCurrentUid();
  if (!uid || !db) return bestFromLocal;

  const userScoreRef = doc(db, "userLevelScores", uid);
  const snap = await getDoc(userScoreRef);
  const existingData = snap.exists() ? snap.data() : {};
  const currentBest = Number(existingData[levelId] ?? 0);
  const bestStars = Math.max(currentBest, safeStars);

  if (bestStars !== currentBest || !snap.exists()) {
    await setDoc(
      userScoreRef,
      { [levelId]: bestStars },
      { merge: true }
    );
  }

  const merged = { ...cached, ...existingData, [levelId]: bestStars };
  cacheScores(merged);

  return bestStars;
}

export async function getAllLevelScores() {
  const cached = getCachedScores();

  const uid = await getCurrentUid();
  if (!uid || !db) return cached;

  const userScoreRef = doc(db, "userLevelScores", uid);
  const snap = await getDoc(userScoreRef);

  const cloud = snap.exists() ? snap.data() : {};
  const merged = { ...cached, ...cloud };
  cacheScores(merged);
  return merged;
}

export function watchAllLevelScores(callback) {
  callback(getCachedScores());

  let unsubscribeFirestore = null;
  let unsubscribeAuth = null;

  if (!auth || !db) {
    return () => {};
  }

  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
      unsubscribeFirestore = null;
    }

    if (!user) {
      callback(getCachedScores());
      return;
    }

    const userScoreRef = doc(db, "userLevelScores", user.uid);

    unsubscribeFirestore = onSnapshot(userScoreRef, (snap) => {
      const cloud = snap.exists() ? snap.data() : {};
      const merged = { ...getCachedScores(), ...cloud };
      cacheScores(merged);
      callback(merged);
    });
  });

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
    if (unsubscribeAuth) unsubscribeAuth();
  };
}
