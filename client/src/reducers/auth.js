import {AUTH, LOGOUT} from '../constatns/actionTypes.js'


const authReducers = (state = {authData : null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));

            return { ...state, authData: action?.data };
        
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
    
        default:
            return state;
    }
}

export default authReducers;