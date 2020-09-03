import { createStore } from 'redux';

const initialState = {
    user: {},
    login: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_LOGIN':
            return { ...state, login: action.payload }
        default:
            return state;
    }
}

export default createStore(reducer)