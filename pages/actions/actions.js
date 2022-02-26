import axios from "axios";
import {
    LOGIN,
    REGISTER,
    LOGINPROCESSING,
    REGISTERING,
    LOGOUT
} from "./actionTypes.js";


export const startLogin = (content) => dispatch => {
    return new Promise((resolve, reject) => {
        let config;
        dispatch(loginProcessing());
        config ={
            method: 'post',
            url: "http://104.243.32.219:1337/auth/local/",

            data: {
                identifier:content.email,
                password:content.password
            },
            headers: {'Content-Type': 'application/json'},
        };
        axios(config).then(res => {
            let userInfo ={
                email:res.data.user.email,
                created_at:res.data.user.created_at,
            }
            console.log(userInfo);


            dispatch(login(userInfo));
            resolve(userInfo)


        }).catch(error => {
            console.log(error);

            reject(error)

        });
    });
}



export const startRegister = content => {
    return dispatch => {
        dispatch(registerProcessing());
        setTimeout(() => {
            dispatch(register(content));
        }, 2000);
    };
};

const loginProcessing = () => {
    return {
        type: LOGINPROCESSING,
        payload: "",
    };
};

const login = content => {
    return {
        type: LOGIN,
        payload: content,

    };
};


const registerProcessing = () => {
    return {
        type: REGISTERING,
        payload: "",

    };
};

export const register = content => {
    return {
        type: REGISTER,
        payload: content,

    };
};


export const logout = () => {
    return {
        type: LOGOUT,
        payload: "",

    };
};