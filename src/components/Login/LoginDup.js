import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// import {
//     initializeLoginFramework,
//     googleSignIn,
//     facebookSignIn,
// } from './LoginManager';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || {
        from: {
            pathname: '/',
        },
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // initializeLoginFramework();
    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //     .then((res) => {
    //         console.log(res);
    //     })
    // };

    // const handleFacebookSignIn = () => {
    //     facebookSignIn()
    //     .then((response) => {
    //         setLoggedInUser(response);
    //         history.replace(from);
    //     });
    // };

    // google sign in handle
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                setLoggedInUser(response.user);
                history.replace(from);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // facebook sign in handle
    const handleFacebookSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                setLoggedInUser(response.user);
                history.replace(from);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // log in using email and password
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        successful: false,
    });

    const handleBlur = (event) => {
        let newUser = {};
        let isFieldValid = true;
        let isTwoPasswordValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (
            event.target.name === 'password' ||
            event.target.name === 'confirmPassword'
        ) {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid && isTwoPasswordValid) {
            newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
        if (
            isFieldValid &&
            newUser.confirmPassword &&
            newUser.password !== newUser.confirmPassword
        ) {
            newUser.error = 'Password not matched';
        } else {
            newUser.error = '';
        }
    };

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password === user.confirmPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUser = {
                        ...user,
                    };
                    newUser.error = error.message;
                    newUser.successful = false;
                    setUser(newUser);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUser = response.user;
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = {
                        ...user,
                    };
                    newUser.error = error.message;
                    newUser.successful = false;
                    setUser(newUser);
                });
        }
        event.preventDefault();
    };

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: name })
            .then(() => {
                console.log('username updated successfully.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='text-center container py-5 w-50'>
            <form
                onSubmit={handleSubmit}
                className='border border-secondary p-3 rounded'
            >
                <legend className='fw-bold'>
                    {newUser ? 'Create an account' : 'Login'}
                </legend>{' '}
                {user.successful && (
                    <p className='text-success'>
                        Account {newUser ? 'created' : 'logged in'}{' '}
                        successfully.
                    </p>
                )}
                <p className='text-danger'> {user.error} </p>
                {newUser && (
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            onBlur={handleBlur}
                            placeholder='Name'
                            required
                        />
                    </div>
                )}
                <div className='form-group'>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        onBlur={handleBlur}
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        name='password'
                        onBlur={handleBlur}
                        placeholder='Password'
                        required
                    />
                </div>
                {newUser && (
                    <div className='form-group'>
                        <input
                            type='password'
                            name='confirmPassword'
                            className='form-control'
                            onBlur={handleBlur}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                )}
                {!newUser && (
                    <div className='form-group form-check'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            id='exampleCheck1'
                        />
                        <label
                            className='form-check-label'
                            htmlFor='exampleCheck1'
                        >
                            Remember Me{' '}
                        </label>{' '}
                    </div>
                )}{' '}
                <br />
                <input
                    type='submit'
                    className='btn btn-danger form-control'
                    value={newUser ? 'Create an account' : 'Login'}
                />
            </form>{' '}
            <br />
            <h6>
                {' '}
                {newUser
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                <span
                    className='text-danger'
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => setNewUser(!newUser)}
                >
                    {newUser ? 'Login' : 'Create an account'}{' '}
                </span>{' '}
            </h6>
            <hr />
            <button
                className='btn btn-danger rounded-pill'
                onClick={handleGoogleSignIn}
            >
                <FontAwesomeIcon icon={faGoogle} /> Continue with Google{' '}
            </button>{' '}
            <br />
            <br />
            <button
                className='btn btn-danger rounded-pill'
                onClick={handleFacebookSignIn}
            >
                <FontAwesomeIcon icon={faFacebook} /> Continue with Facebook{' '}
            </button>{' '}
        </div>
    );
};

export default Login;
