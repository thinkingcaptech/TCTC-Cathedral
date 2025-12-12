// Firebase Authentication & Database Management

let db;
let auth;
let currentUser = null;

// Initialize Firebase
function initFirebase() {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        
        // Check for email link sign-in FIRST (only if URL has sign-in parameters)
        if (window.location.href.includes('apiKey=')) {
            completeEmailLinkSignIn();
        }
        
        // Auth state observer
        auth.onAuthStateChanged(user => {
            if (user) {
                currentUser = user;
                onUserLoggedIn(user);
            } else {
                currentUser = null;
                onUserLoggedOut();
            }
        });
        
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        showToast('Failed to initialize Firebase', 'error');
    }
}

// User logged in
function onUserLoggedIn(user) {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-name').textContent = user.displayName || user.email;
    
    // Load initial data in background (don't block UI)
    setTimeout(() => loadDashboard(), 100);
}

// User logged out
function onUserLoggedOut() {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
}

// Sign Up (Email/Password)
async function signUp(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update profile
        await user.updateProfile({ displayName });
        
        // Create user document
        await db.collection('users').doc(user.uid).set({
            email: user.email,
            displayName: displayName,
            role: 'sales',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Account created successfully!', 'success');
    } catch (error) {
        console.error('Sign up error:', error);
        showToast(error.message, 'error');
    }
}

// Login (Email/Password)
async function login(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showToast('Logged in successfully!', 'success');
    } catch (error) {
        console.error('Login error:', error);
        showToast(error.message, 'error');
    }
}

// Send Email Link for Passwordless Sign-In
async function sendSignInLink(email, displayName = null) {
    try {
        const actionCodeSettings = {
            // URL you want to redirect back to after email link is clicked
            url: window.location.origin + '/index.html',
            handleCodeInApp: true
        };
        
        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        
        // Save email to localStorage to complete sign-in
        window.localStorage.setItem('emailForSignIn', email);
        if (displayName) {
            window.localStorage.setItem('displayNameForSignIn', displayName);
        }
        
        showToast('Sign-in link sent! Check your email.', 'success');
    } catch (error) {
        console.error('Send link error:', error);
        showToast(error.message, 'error');
    }
}

// Complete Email Link Sign-In
async function completeEmailLinkSignIn() {
    // Check if user is signing in with email link
    if (auth && auth.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        // If email is not in localStorage, prompt user for it
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        
        // If still no email, user canceled - just clean URL and return
        if (!email) {
            window.history.replaceState(null, null, window.location.pathname);
            return;
        }
        
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            
            // Clear email from storage
            window.localStorage.removeItem('emailForSignIn');
            const displayName = window.localStorage.getItem('displayNameForSignIn');
            window.localStorage.removeItem('displayNameForSignIn');
            
            // Create/update user document in background (don't wait for it)
            const userDocPromise = db.collection('users').doc(result.user.uid).get()
                .then(userDoc => {
                    if (!userDoc.exists) {
                        return db.collection('users').doc(result.user.uid).set({
                            email: result.user.email,
                            displayName: displayName || result.user.email.split('@')[0],
                            role: 'sales',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                })
                .then(() => {
                    if (displayName && result.user.displayName !== displayName) {
                        return result.user.updateProfile({ displayName });
                    }
                })
                .catch(err => console.error('User doc creation error:', err));
            
            showToast('Signed in successfully!', 'success');
            
            // Clean URL immediately (don't wait for user doc)
            window.history.replaceState(null, null, window.location.pathname);
        } catch (error) {
            console.error('Email link sign-in error:', error);
            showToast('Sign-in failed: ' + error.message, 'error');
            // Clean URL even on error
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
}

// Logout
async function logout() {
    try {
        await auth.signOut();
        showToast('Logged out successfully', 'info');
    } catch (error) {
        console.error('Logout error:', error);
        showToast(error.message, 'error');
    }
}

// CRUD Operations for Leads
async function createLead(leadData) {
    try {
        const lead = {
            ...leadData,
            userId: currentUser.uid,
            score: leadData.score || 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastContact: firebase.firestore.FieldValue.serverTimestamp(),
            lastActivity: 'Lead created'
        };
        
        const docRef = await db.collection('leads').add(lead);
        
        // Create initial activity
        await createActivity(docRef.id, 'note', 'Lead created');
        
        showToast('Lead created successfully!', 'success');
        return docRef.id;
    } catch (error) {
        console.error('Create lead error:', error);
        showToast('Failed to create lead', 'error');
        throw error;
    }
}

async function updateLead(leadId, updates) {
    try {
        await db.collection('leads').doc(leadId).update({
            ...updates,
            lastContact: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Lead updated successfully!', 'success');
    } catch (error) {
        console.error('Update lead error:', error);
        showToast('Failed to update lead', 'error');
        throw error;
    }
}

async function deleteLead(leadId) {
    try {
        // Delete all activities for this lead
        const activities = await db.collection('activities')
            .where('leadId', '==', leadId)
            .get();
        
        const batch = db.batch();
        activities.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        
        // Delete the lead
        await db.collection('leads').doc(leadId).delete();
        
        showToast('Lead deleted successfully', 'success');
    } catch (error) {
        console.error('Delete lead error:', error);
        showToast('Failed to delete lead', 'error');
        throw error;
    }
}

async function getLead(leadId) {
    try {
        const doc = await db.collection('leads').doc(leadId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Get lead error:', error);
        throw error;
    }
}

async function getLeads(filters = {}) {
    try {
        let query = db.collection('leads').where('userId', '==', currentUser.uid);
        
        if (filters.stage) {
            query = query.where('stage', '==', filters.stage);
        }
        
        const snapshot = await query.get();
        const leads = [];
        
        snapshot.forEach(doc => {
            leads.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort in JavaScript instead of Firestore to avoid index requirement
        leads.sort((a, b) => {
            const aTime = a.createdAt?.toDate() || new Date(0);
            const bTime = b.createdAt?.toDate() || new Date(0);
            return bTime - aTime;
        });
        
        return leads;
    } catch (error) {
        console.error('Get leads error:', error);
        throw error;
    }
}

// Activity Management
async function createActivity(leadId, type, description) {
    try {
        await db.collection('activities').add({
            leadId: leadId,
            userId: currentUser.uid,
            type: type,
            description: description,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Update lead's last activity
        await db.collection('leads').doc(leadId).update({
            lastActivity: description,
            lastContact: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Create activity error:', error);
        throw error;
    }
}

async function getActivities(leadId) {
    try {
        console.log('Fetching activities for leadId:', leadId);
        console.log('Current user:', currentUser?.uid);
        
        const snapshot = await db.collection('activities')
            .where('leadId', '==', leadId)
            .get();
        
        console.log('Activities query returned:', snapshot.size, 'documents');
        
        const activities = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            console.log('Activity doc:', doc.id, data);
            activities.push({ id: doc.id, ...data });
        });
        
        // Sort in JavaScript to avoid Firestore index requirement
        activities.sort((a, b) => {
            const aTime = a.createdAt?.toDate() || new Date(0);
            const bTime = b.createdAt?.toDate() || new Date(0);
            return bTime - aTime;
        });
        
        console.log('Returning', activities.length, 'sorted activities');
        return activities;
    } catch (error) {
        console.error('Get activities error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        throw error;
    }
}

// Email Templates
async function createTemplate(template) {
    try {
        await db.collection('emailTemplates').add({
            ...template,
            userId: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('Template saved successfully!', 'success');
    } catch (error) {
        console.error('Create template error:', error);
        showToast('Failed to save template', 'error');
        throw error;
    }
}

async function getTemplates() {
    try {
        const snapshot = await db.collection('emailTemplates')
            .where('userId', '==', currentUser.uid)
            .get();
        
        const templates = [];
        snapshot.forEach(doc => {
            templates.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort in JavaScript to avoid Firestore index requirement
        templates.sort((a, b) => {
            const aTime = a.createdAt?.toDate() || new Date(0);
            const bTime = b.createdAt?.toDate() || new Date(0);
            return bTime - aTime;
        });
        
        return templates;
    } catch (error) {
        console.error('Get templates error:', error);
        throw error;
    }
}

async function deleteTemplate(templateId) {
    try {
        await db.collection('emailTemplates').doc(templateId).delete();
        showToast('Template deleted', 'success');
    } catch (error) {
        console.error('Delete template error:', error);
        showToast('Failed to delete template', 'error');
        throw error;
    }
}

// Real-time listeners
function subscribeToLeads(callback) {
    return db.collection('leads')
        .where('userId', '==', currentUser.uid)
        .onSnapshot(snapshot => {
            const leads = [];
            snapshot.forEach(doc => {
                leads.push({ id: doc.id, ...doc.data() });
            });
            callback(leads);
        });
}

// Initialize Firebase on load
document.addEventListener('DOMContentLoaded', initFirebase);
