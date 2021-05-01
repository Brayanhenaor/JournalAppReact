import { types } from "../types/types"
import { googleAuthProvider, firebase } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try{
            const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
            
            dispatch(
                login(user.uid, user.displayName)
            );
        }
        catch(error){
            console.log(error);

            Swal.fire('Error', error.message, 'error');
        }
        finally{
            dispatch(finishLoading());
        }
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name)=>{
    return async (dispatch) => {
        try{
            const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            await user.updateProfile({
                displayName : name
            });
    
            dispatch(
                login(user.uid, user.displayName)
            );
        }
        catch(error){
            console.log(error);
            Swal.fire('Error', error.message, 'error');
        }

    }
}

export const startGoogleLogin = ()=>{
    return (dispatch)=>{
        console.log("Si");
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) =>{
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid, displayName) =>
    ({
        type : types.login,
        payload : {
            uid,
            displayName
        }
    });


export const startLogout = () => {
    return async (dispatch)=>{
        await firebase.auth().signOut();
        
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
        type : types.logout
    });
