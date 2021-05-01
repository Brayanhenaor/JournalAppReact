import React from 'react';
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const {msgError} = useSelector( state => state.ui );

    const initialForm={
        name : 'Brayan',
        email : 'b@out.com',
        password : '123456',
        password2 : '123456'
    };

    const [formValues, handleInputChanged] = useForm(initialForm);

    const {name, email, password, password2} = formValues;

    const dispatch = useDispatch();

    const handleRegister = (e) =>{
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = ()=>{

        if(name.trim().length === 0){
            dispatch(setErrorAction('Name is required'));
            return false;

        } else if( !validator.isEmail(email) ){
            dispatch(setErrorAction('Email is not valid'));
            return false;

        } else if(password !== password2 || password.length < 5){
            dispatch(setErrorAction('Password should be at least 6 characters and match'));
            return false;

        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={handleRegister}>
                
                { msgError && <div className="auth__alert-error">
                    {msgError}
                </div> }
                
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChanged}
                    value={name}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChanged}
                    value={email}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChanged}
                    value={password}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChanged}
                    value={password2}
                />

                <button
                    className="btn btn-primary"
                    type="submit">
                    Register
                </button>

                <Link className="link mt-5" to="/auth/login">
                    Already registered?
                </Link>
                
            </form>
        </>
    )
}
