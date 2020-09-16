import { createStore } from 'redux';

let user = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{};
let login = sessionStorage.getItem('is_login')?sessionStorage.getItem('is_login'):false

const initialState = {
    user,
    login,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            sessionStorage.setItem('userInfo', JSON.stringify(action.payload));
            return { ...state, user: action.payload }
        case 'SET_LOGIN':
            sessionStorage.setItem('is_login', action.payload)
            return { ...state, login: action.payload }
        default:
            return state;
    }
}

export default createStore(reducer)