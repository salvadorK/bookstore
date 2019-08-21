import {
    createStore
} from "redux";
let reducer = function (state, action) {
    if (action.type === "query") {
        return {
            ...state,
            searchQuery: action.q
        }
    }
    if (action.type === "login") {
        return {
            ...state,
            username: action.username
        }
    }
    if (action.type === "logout") {
        return {
            ...state,
            username: ""
        }
    }
    if (action.type === "totalqty") {
        return {
            ...state,
            totalqty: action.totalquantity
        }
    }

    return state;
};

const store = createStore(
    reducer, {
        searchQuery: "",
        username: "",
        totalqty: ""
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;