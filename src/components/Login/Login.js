import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

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

    // log in using email and password
    const [newUser, setNewUser] = useState(true);
    // const [nam, setName] = useState('');

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
        let isFieldValid = true;
        console.log(event.target.name, event.target.value);
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
        if (isFieldValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    };

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password && user.confirmPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    updateUserName(user.name);
                    // setLoggedInUser(newUser);
                    // history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
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
                    // const newUser = { ...user };
                    const newUser = response.user;
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.successful = false;
                    setUser(newUser);
                });
        }
        event.preventDefault();
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

    return (
        <div className='text-center container py-5 w-50'>
            <h1>{user.name}</h1>
            <form
                onSubmit={handleSubmit}
                className='border border-secondary p-3 rounded'
            >
                <legend className='fw-bold'>{newUser ? 'Create an account' : 'Login'}</legend>
                {user.successful && (
                    <p className='text-success'>
                        Account {newUser ? 'created' : 'logged in'}{' '}
                        successfully.
                    </p>
                )}
                <p className='text-danger'>{user.error}</p>
                {newUser && (
                    <input
                        type='text'
                        className='form-control'
                        name='name'
                        onBlur={handleBlur}
                        placeholder='Name'
                        required
                    />
                )}
                <br />
                <input
                    type='email'
                    className='form-control'
                    name='email'
                    onBlur={handleBlur}
                    placeholder='Email'
                    required
                />
                <br />
                <input
                    type='password'
                    className='form-control'
                    name='password'
                    onBlur={handleBlur}
                    placeholder='Password'
                    required
                />
                <br />
                {newUser && (
                    <input
                        type='password'
                        name='confirmPassword'
                        className='form-control'
                        onBlur={handleBlur}
                        placeholder='Confirm Password'
                        required
                    />
                )}
                <br />
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
                            Remember Me
                        </label>
                    </div>
                )}
                <br />
                <input
                    type='submit'
                    className='btn btn-danger form-control'
                    value={newUser ? 'Create an account' : 'Login'}
                />
            </form>
            <br />
            <h6>
                {newUser
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                <span
                    className='text-danger'
                    style={{ cursor: 'pointer' }}
                    onClick={() => setNewUser(!newUser)}
                >
                    {newUser ? 'Login' : 'Create an account'}
                </span>{' '}
            </h6>

            <hr />
            <button
                className='btn btn-danger rounded-pill'
                onClick={handleGoogleSignIn}
            >
                <FontAwesomeIcon icon={faGoogle} /> Continue with Google
            </button>
        </div>
    );
};

export default Login;
