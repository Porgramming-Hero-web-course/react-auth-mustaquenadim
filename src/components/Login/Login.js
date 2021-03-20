import React, { useContext, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
    initializeLoginFramework,
    handleGoogleSignIn,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from './LoginManager';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const responseHandler = (response, redirect) => {
        setUser(response);
        setLoggedInUser(response);
        // updateUserName(response);
        if (redirect) {
            history.replace(from);
        }
    };

    initializeLoginFramework();

    const googleSignIn = () => {
        handleGoogleSignIn().then((response) => {
            responseHandler(response, true);
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
        let isFieldValid = true;
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (event.target.value)
        if (isFieldValid) {
            console.log(isFieldValid);
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    };

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((response) => {
                responseHandler(response, false);
            });
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (response) => {
                    responseHandler(response, true);
                }
            );
        }
        event.preventDefault();
    };

    return (
        <div className='text-center container my-3 py-5 w-50'>
            <form onSubmit={handleSubmit} className='border border-secondary p-3 rounded'>
                <legend>{newUser ? 'Create an account' : 'Login'}</legend>
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
                    placeholder='Enter Email'
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
                    className='btn btn-primary form-control'
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

            {user.successful && (
                <p className='text-success'>
                    Account {newUser ? 'created' : 'logged in'} successfully.
                </p>
            )}
            <hr />
            <button
                className='btn btn-primary rounded-pill'
                onClick={googleSignIn}
            >
                <FontAwesomeIcon icon={faGoogle} />   Continue with Google
            </button>
        </div>
    );
};

export default Login;
