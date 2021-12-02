import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SHOW_ERROR_MODAL: "SHOW_ERROR_MODAL",
    HIDE_ERROR_MODAL: "HIDE_ERROR_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        showModal: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    showModal: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    showModal: false
                });
            }
            case AuthActionType.LOGIN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    showModal: false
                });
            }
            case AuthActionType.LOGOUT: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    showModal: false
                })
            }
            case AuthActionType.SHOW_ERROR_MODAL: {
                return setAuth({
                    user: payload,
                    loggedIn: false,
                    showModal: true
                });
            }
            case AuthActionType.HIDE_ERROR_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    showModal: false
                });
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        } catch (e) {
            // console.log(e.response)
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: false,
                    user: null
                }
            })
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);  
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadAllLists();
            }
        } catch (e) {
            console.log(e.response.data.errorMessage);
            authReducer({
                type: AuthActionType.SHOW_ERROR_MODAL,
                payload: e.response.data.errorMessage
            });
        }
    }
    
    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN,
                    payload: {
                        user: response.data.user,
                    }
                });
                history.push("/");
                store.loadAllLists();
            }
        } catch (e) {
            // console.log(e.response.data.errorMessage);
            // let message = e.response.data.errorMessage
            // console.log(message)
            authReducer({
                type: AuthActionType.SHOW_ERROR_MODAL,
                payload: e.response.data.errorMessage
            })
        }
    }
    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 204) {
            authReducer({
                type: AuthActionType.LOGOUT
            });
            history.push("/");
        }
    }

    auth.hideModal = function () {
        authReducer({
            type: AuthActionType.HIDE_ERROR_MODAL
        });
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };