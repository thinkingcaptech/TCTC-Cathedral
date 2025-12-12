(function initFirebase() {
    if (!window.firebase) {
        console.warn('Firebase SDK not loaded. Ensure firebase-app-compat.js is included.');
        return;
    }

    const defaultConfig = {
        apiKey: 'AIzaSyDx-o8U2wJ8YrERvDrhruJnhehbvhofPwQ',
        authDomain: 'businesshealthdiagnostictool.firebaseapp.com',
        projectId: 'businesshealthdiagnostictool',
        storageBucket: 'businesshealthdiagnostictool.firebasestorage.app',
        messagingSenderId: '954152344797',
        appId: '1:954152344797:web:f973e89816499a7dc04f34',
        measurementId: 'G-5FGMGQHNXD',
    };

    const config = window.firebaseConfig || defaultConfig;

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    firebase.firestore().settings({ ignoreUndefinedProperties: true });
    window.db = firebase.firestore();

    if (typeof firebase.analytics === 'function') {
        try {
            window.analytics = firebase.analytics();
        } catch (analyticsError) {
            console.warn('Analytics initialization failed:', analyticsError);
        }
    } else {
        console.info('Analytics SDK not detected. Include firebase-analytics-compat.js to enable it.');
    }
})();
