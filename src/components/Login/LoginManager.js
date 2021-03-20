import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

// firebase initialize
export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
};

// google sign in handle
export const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
            const { displayName, email } = response.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                successful: true
            };
            return signedInUser;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const newUser = response.user;
            newUser.error = '';
            newUser.successful = true;
            updateUserName(name);
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.successful = false;
            return newUser;
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const newUser = response.user;
            newUser.error = '';
            newUser.successful = true;
            const { displayName, email } = response.user;
            const signedInUser = {
                name: displayName,
                email: email,
            };
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.successful = false;
            return newUser;
        });
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
            console.log('username updated successfully.');
        })
        .catch(function (error) {
            console.log(error);
        });
};