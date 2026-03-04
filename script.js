import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const levels = [
    { id: 1, title: "The Puddle", status: 'completed', yOffset: 0 },
    { id: 2, title: "Local Pond", status: 'completed', yOffset: -60 },
    { id: 3, title: "Rushing River", status: 'current', yOffset: 60 },
    { id: 4, title: "Misty Lake", status: 'locked', yOffset: -30 },
    { id: 5, title: "Deep Ocean", status: 'locked', yOffset: 0 },
];

const state = {
    isSettingsOpen: false,
};

// Auth Service (Firebase Wrapper)
const AuthService = {
    login: async (email, password) => {
        if (!auth) return { success: false, message: "Firebase configuration missing. Check console for details." };
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Login Error:", error.code, error.message);
            let message = error.message;
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                message = "Invalid email or password.";
            } else if (error.code === 'auth/invalid-credential') {
                message = "Invalid credentials.";
            } else if (error.code === 'auth/too-many-requests') {
                message = "Too many failed attempts. Please try again later.";
            }
            return { success: false, message: message };
        }
    },

    signup: async (username, email, password) => {
        if (!auth) return { success: false, message: "Firebase configuration missing. Check console for details." };
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Signup Error:", error.code, error.message);
            let message = error.message;
            if (error.code === 'auth/operation-not-allowed') {
                message = "Email/Password sign-in is not enabled in Firebase Console. Please enable it in the Authentication section.";
            } else if (error.code === 'auth/email-already-in-use') {
                message = "Email is already in use.";
            } else if (error.code === 'auth/weak-password') {
                message = "Password is too weak. It should be at least 6 characters.";
            } else if (error.code === 'auth/invalid-api-key') {
                message = "Invalid Firebase API Key. Please check your .env file.";
            }
            return { success: false, message: message };
        }
    },

    logout: async () => {
        if (!auth) return;
        try {
            await signOut(auth);
            window.location.href = 'frontpage.html';
        } catch (error) {
            console.error("Logout error:", error);
        }
    },

    getCurrentUser: () => {
        return auth ? auth.currentUser : null;
    }
};

// DOM Elements
const settingsOverlay = document.getElementById('settings-overlay');
const settingsBackdrop = document.getElementById('settings-backdrop');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsCloseFooter = document.getElementById('settings-close-footer');
const settingsLogoutBtn = document.getElementById('settings-logout-btn');
const headerSettingsBtn = document.getElementById('header-settings-btn');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('dashboard-back-btn');
const dashboardContent = document.getElementById('dashboard-content');

// Auth Forms & Inputs
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const signupUsernameInput = document.getElementById('signup-username');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

// Auth Buttons
const landingLoginBtn = document.querySelector('.btn-login');
const landingSignupBtn = document.querySelector('.btn-signup');
const loginBackBtn = document.getElementById('login-back-btn');
const signupBackBtn = document.getElementById('signup-back-btn');
const goToSignupBtn = document.getElementById('go-to-signup');
const goToLoginBtn = document.getElementById('go-to-login');

const authSelectLoginBtn = document.getElementById('auth-select-login-btn');
const authSelectSignupBtn = document.getElementById('auth-select-signup-btn');
const authSelectBackBtn = document.getElementById('auth-select-back-btn');

// Check Auth State on Load
if (auth) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            updateUIForLoggedInUser(user);
            
            // If on login, signup, or auth-selection page, redirect to dashboard
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('signup.html') ||
                window.location.pathname.includes('auth-selection.html')) {
                 window.location.href = './levelMap.html';
            }
        } else {
            // User is signed out
            // If on dashboard, redirect to login
            if (window.location.pathname.includes('levelMap.html')) {
                window.location.href = './login.html';
            }
        }
    });
} else {
    console.warn("Auth not initialized, skipping auth state check");
}

function updateUIForLoggedInUser(user) {
    // Update Start Button Text (only on landing page)
    if (startBtn) {
        const startBtnText = startBtn.querySelector('span');
        if (startBtnText) {
            // Use email as username fallback since displayName might be empty initially
            const displayName = user.displayName || user.email.split('@')[0];
            startBtnText.innerHTML = `Continue as ${displayName} <svg style="width: 16px; height: 16px; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>`;
        }
        
        // Update Start Button Action
        startBtn.onclick = () => window.location.href = 'levelMap.html';
    }
    
    // Hide Login/Signup buttons and show Logout (only on landing page)
    if (landingLoginBtn) {
        const authButtonsContainer = landingLoginBtn.parentElement;
        if (authButtonsContainer) {
             authButtonsContainer.innerHTML = `
                <button class="btn-secondary btn-login" id="logout-btn">
                    <span style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));">Logout</span>
                </button>
            `;
            // Re-attach listener for dynamic button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) logoutBtn.addEventListener('click', () => AuthService.logout());
        }
    }
}

// Event Listeners
if (headerSettingsBtn) headerSettingsBtn.addEventListener('click', toggleSettings);
if (settingsBackdrop) settingsBackdrop.addEventListener('click', toggleSettings);
if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', toggleSettings);
if (settingsCloseFooter) settingsCloseFooter.addEventListener('click', toggleSettings);
if (settingsLogoutBtn) settingsLogoutBtn.addEventListener('click', () => AuthService.logout());

if (startBtn) {
    // Default behavior if not logged in (overridden by updateUIForLoggedInUser)
    startBtn.addEventListener('click', () => {
        console.log("Start button clicked");
        if (!auth || !auth.currentUser) {
            window.location.href = './auth-selection.html';
        }
    });
}

if (backBtn) backBtn.addEventListener('click', () => window.location.href = 'frontpage.html');

// Auth Event Listeners
if (landingLoginBtn) {
    landingLoginBtn.addEventListener('click', () => {
        console.log("Navigating to login.html");
        window.location.href = 'login.html';
    });
}

if (landingSignupBtn) {
    landingSignupBtn.addEventListener('click', () => {
        console.log("Navigating to signup.html");
        window.location.href = 'signup.html';
    });
}

if (authSelectLoginBtn) {
    authSelectLoginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

if (authSelectSignupBtn) {
    authSelectSignupBtn.addEventListener('click', () => {
        window.location.href = 'signup.html';
    });
}

if (authSelectBackBtn) {
    authSelectBackBtn.addEventListener('click', () => {
        window.location.href = 'frontpage.html';
    });
}

if (loginBackBtn) loginBackBtn.addEventListener('click', () => window.location.href = 'auth-selection.html');
if (signupBackBtn) signupBackBtn.addEventListener('click', () => window.location.href = 'auth-selection.html');
if (goToSignupBtn) goToSignupBtn.addEventListener('click', () => window.location.href = 'signup.html');
if (goToLoginBtn) goToLoginBtn.addEventListener('click', () => window.location.href = 'login.html');

// Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        
        const result = await AuthService.login(email, password);
        if (result.success) {
            window.location.href = 'levelMap.html';
        } else {
            alert(result.message);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = signupUsernameInput.value;
        const email = signupEmailInput.value;
        const password = signupPasswordInput.value;
        
        const result = await AuthService.signup(username, email, password);
        if (result.success) {
            window.location.href = 'levelMap.html';
        } else {
            alert(result.message);
        }
    });
}

// Render Dashboard if on dashboard page
if (dashboardContent) {
    renderDashboard();
}

// Functions
function toggleSettings() {
    state.isSettingsOpen = !state.isSettingsOpen;
    if (state.isSettingsOpen) {
        settingsOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        settingsOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function renderDashboard() {
    // Configuration for layout
    const levelSpacing = 220;
    const startX = 150;
    const containerHeight = 500;
    const centerY = containerHeight / 2;
    
    const totalWidth = startX + ((levels.length - 1) * levelSpacing) + startX;

    const getCoords = (level, index) => {
        return {
            x: startX + index * levelSpacing,
            y: centerY + level.yOffset
        };
    };

    // Generate SVG Path
    let pathD = `M ${startX} ${centerY + levels[0].yOffset}`;
    for (let i = 0; i < levels.length - 1; i++) {
        const start = getCoords(levels[i], i);
        const end = getCoords(levels[i + 1], i + 1);
        
        const cp1 = { x: start.x + levelSpacing * 0.5, y: start.y };
        const cp2 = { x: end.x - levelSpacing * 0.5, y: end.y };
        
        pathD += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    }

    // Render Dashboard Content
    // We need to construct the inner HTML for the dashboard content
    // This includes the SVG and the Level Nodes
    
    let html = `
        <div class="dashboard-map-container" style="width: ${totalWidth}px; height: ${containerHeight}px;">
            <svg 
                class="dashboard-svg-layer"
                viewBox="0 0 ${totalWidth} ${containerHeight}"
                preserveAspectRatio="none" 
            >
                <path 
                    d="${pathD}" 
                    fill="none" 
                    stroke="#a855f7" 
                    stroke-width="12" 
                    stroke-opacity="0.1" 
                    stroke-linecap="round"
                    vector-effect="non-scaling-stroke"
                />
                <path 
                    d="${pathD}" 
                    fill="none" 
                    stroke="#d8b4fe" 
                    stroke-width="4" 
                    stroke-dasharray="12 8" 
                    stroke-linecap="round" 
                    class="dashboard-path-secondary"
                    vector-effect="non-scaling-stroke"
                />
            </svg>
    `;

    levels.forEach((level, index) => {
        const coords = getCoords(level, index);
        const isLocked = level.status === 'locked';
        const isCurrent = level.status === 'current';
        const isCompleted = level.status === 'completed';

        let circleClasses = "level-node ";
        if (isLocked) {
            circleClasses += "locked";
        } else if (isCurrent) {
            circleClasses += "current";
        } else {
            circleClasses += "completed";
        }

        // Custom Water Body SVGs
        let waterSvg = '';
        switch(level.id) {
            case 1: // Puddle
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><path d="M50 15 C 20 15 5 35 15 60 C 25 85 50 95 75 85 C 95 75 95 45 75 25 C 65 15 50 15 50 15 Z" fill="#60a5fa" stroke="#93c5fd" stroke-width="3" /></svg>`;
                break;
            case 2: // Pond
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#3b82f6" stroke="#93c5fd" stroke-width="3" /><path d="M65 65 Q 75 55 85 65" stroke="#86efac" stroke-width="2" fill="none" /><circle cx="70" cy="60" r="8" fill="#4ade80" /></svg>`;
                break;
            case 3: // River
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#2563eb" stroke="#60a5fa" stroke-width="3" /><path d="M15 45 Q 35 25 55 45 T 90 45" stroke="white" stroke-width="4" fill="none" opacity="0.6" /><path d="M10 65 Q 30 45 50 65 T 85 65" stroke="white" stroke-width="4" fill="none" opacity="0.6" /></svg>`;
                break;
            case 4: // Lake
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="50" rx="48" ry="42" fill="#1d4ed8" stroke="#3b82f6" stroke-width="3" /><path d="M25 35 H75" stroke="white" stroke-width="2" stroke-dasharray="8 6" opacity="0.3" /><path d="M35 65 H65" stroke="white" stroke-width="2" stroke-dasharray="8 6" opacity="0.3" /></svg>`;
                break;
            case 5: // Ocean
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="3" /><path d="M5 55 Q 25 35 50 55 T 95 55 V 90 A 45 45 0 0 1 5 55 Z" fill="#172554" /></svg>`;
                break;
        }

        let overlayContent = '';
        if (isLocked) {
            overlayContent = `<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;"><svg style="width: 24px; height: 24px; color: #d1d5db;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>`;
        } else if (isCompleted) {
             overlayContent = `<div style="position: absolute; top: -15px; width: 100%; display: flex; justify-content: center; gap: 2px;"><div style="color: #facc15; font-size: 1.25rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div><div style="color: #facc15; font-size: 1.5rem; margin-top: -6px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div><div style="color: #facc15; font-size: 1.25rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div></div>`;
        } else if (isCurrent) {
             // Add a subtle pulse overlay or marker for current
             overlayContent = `<div style="position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; pointer-events: none;"></div>`;
        }

        let tooltipClasses = "level-tooltip ";
        if (isCurrent) {
            tooltipClasses += "current";
        }

        html += `
            <div 
                class="level-node-container"
                style="left: ${coords.x}px; top: ${coords.y}px;"
            >
                <div class="${circleClasses}">
                    ${waterSvg}
                    ${overlayContent}
                </div>
                <div class="${tooltipClasses}">
                    <span style="color: #9ca3af; margin-right: 8px; text-transform: uppercase; font-size: 0.625rem; letter-spacing: 0.05em;">Lvl ${level.id}</span>
                    ${level.title}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    dashboardContent.innerHTML = html;
}
