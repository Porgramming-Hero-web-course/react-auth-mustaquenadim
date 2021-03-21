import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
            // setLoggedInUser(response.user);
            // history.replace(from);
            return response;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

export const facebookSignIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
            // setLoggedInUser(response.user);
            // history.replace(from);
            return response.user;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

// export const createUserWithEmailAndPassword = () => {
//     firebase
//                 .auth()
//                 .createUserWithEmailAndPassword(user.email, user.password)
//                 .then((response) => {
//                     const newUser = {
//                         ...user,
//                     };
//                     newUser.error = '';
//                     newUser.successful = true;
//                     setUser(newUser);
//                     updateUserName(user.name);
//                     // setLoggedInUser(newUser);
//                     // history.replace(from);
//                 })
//                 .catch((error) => {
//                     const newUser = {
//                         ...user,
//                     };
//                     newUser.error = error.message;
//                     newUser.successful = false;
//                     setUser(newUser);
//                 });
// }

// export const signInWithEmailAndPassword = () => {
//     firebase
//                 .auth()
//                 .signInWithEmailAndPassword(user.email, user.password)
//                 .then((response) => {
//                     const newUser = response.user;
//                     newUser.error = '';
//                     newUser.successful = true;
//                     setUser(newUser);
//                     setLoggedInUser(newUser);
//                     history.replace(from);
//                 })
//                 .catch((error) => {
//                     const newUser = {
//                         ...user,
//                     };
//                     newUser.error = error.message;
//                     newUser.successful = false;
//                     setUser(newUser);
//                 });
// }

// const updateUserName = (name) => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({ displayName: name })
//         .then(() => {
//             console.log('username updated successfully.');
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };





// import firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './firebase.config';

// // firebase initialize
// export const initializeLoginFramework = () => {
//     if (firebase.apps.length === 0) {
//         firebase.initializeApp(firebaseConfig);
//     }
// };

// // google sign in handle
// export const handleGoogleSignIn = () => {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     return firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then((response) => {
//             const { displayName, email } = response.user;
//             const signedInUser = {
//                 isSignedIn: true,
//                 name: displayName,
//                 email: email,
//                 successful: true,
//             };
//             return signedInUser;
//         })
//         .catch((error) => {
//             console.log(error.message);
//         });
// };

// // facebook sign in handle
// export const handleFacebookSignIn = () => {
//     var provider = new firebase.auth.FacebookAuthProvider();
//     firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then((response) => {
//             setLoggedInUser(response.user);
//             history.replace(from);
//         })
//         .catch((error) => {
//             console.log(error.message);
//         });
// };

// export const createUserWithEmailAndPassword = (
//     name,
//     email,
//     password,
//     confirmPassword
// ) => {
//     return firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password, confirmPassword)
//         .then((response) => {
//             const newUser = response.user;
//             newUser.error = '';
//             newUser.successful = true;
//             updateUserName(name);
//             return newUser;
//         })
//         .catch((error) => {
//             const newUser = {};
//             newUser.error = error.message;
//             newUser.successful = false;
//             return newUser;
//         });
// };

// export const signInWithEmailAndPassword = (email, password) => {
//     return firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .then((response) => {
//             const newUser = response.user;
//             newUser.error = '';
//             newUser.successful = true;
//             const { displayName, email } = response.user;
//             const signedInUser = {
//                 isSignedIn: true,
//                 name: displayName,
//                 email: email,
//             };
//             return newUser;
//         })
//         .catch((error) => {
//             const newUser = {};
//             newUser.error = error.message;
//             newUser.successful = false;
//             return newUser;
//         });
// };

// const updateUserName = (name) => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: name,
//     })
//         .then(function () {
//             console.log('username updated successfully.');
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };
