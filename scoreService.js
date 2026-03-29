import { auth, db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

function getCurrentUid() {
  return auth?.currentUser?.uid || null;
}

export async function saveBestLevelScore(levelId, newStars) {
  const uid = getCurrentUid();
  if (!uid || !db) return;

  const userScoreRef = doc(db, "userLevelScores", uid);
  const snap = await getDoc(userScoreRef);

  const existingData = snap.exists() ? snap.data() : {};
  const currentBest = Number(existingData[levelId] ?? 0);
  const safeStars = Math.max(0, Math.min(3, Number(newStars) || 0));
  const bestStars = Math.max(currentBest, safeStars);

  if (bestStars === currentBest && snap.exists()) return;

  await setDoc(
    userScoreRef,
    { [levelId]: bestStars },
    { merge: true }
  );
}

export async function getAllLevelScores() {
  const uid = getCurrentUid();
  if (!uid || !db) return {};

  const userScoreRef = doc(db, "userLevelScores", uid);
  const snap = await getDoc(userScoreRef);

  return snap.exists() ? snap.data() : {};
}

export function watchAllLevelScores(callback) {
  const uid = getCurrentUid();
  if (!uid || !db) {
    callback({});
    return () => {};
  }

  const userScoreRef = doc(db, "userLevelScores", uid);

  return onSnapshot(userScoreRef, (snap) => {
    callback(snap.exists() ? snap.data() : {});
  });
}
