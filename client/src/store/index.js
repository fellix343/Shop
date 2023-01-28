import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

//То, что возвращает редусюр попадет в стор
//Редюсер срабатывает когда диспатч приносит акшин или же когда впервые запускается сайт

export const actionRegistration = (email, password) => {
    return async (dispatch) => {
        const resp = await axios.post(
            "http://127.0.0.1:5000/api/user/registration",
            {
                email,
                password,
                role: "USER",
            }
        );
        console.log(resp.status);
        if (resp.status == 200) {
            localStorage.setItem("token", resp.data.token);
            dispatch({ type: "REGISTRATION", payload: { email, password } });
        }

        dispatch({ type: "REGISTRATION", payload: {} });
    };
};
// не понимаю зачем эти функции но продолжу дальше писать духи не знают усталости
export const actionLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await axios.post("http://127.0.0.1:5000/api/user/login", {
            email,
            password,
            role: "USER",
        });
        console.log(resp.status);
        if (resp.status == 200) {
            //переход на акаунт
            localStorage.setItem("token", resp.data.token);
            dispatch({ type: "AUTHORIZATION", payload: { email, password } });
        }
        dispatch({ type: "AUTHORIZATION", payload: {} });
    };
};
export const checkAuth = (email, password) => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem("token");
        console.log(accessToken); //проверки Спросить как их можно чекнуть на react
        const resp = await axios.post("http://127.0.0.1:5000/api/user/auth", {
            accessToken,
        });
        if (resp.length != 0) {
            localStorage.setItem("token", resp.data.token);
            dispatch({ type: "CHECKAUTH", payload: { email, password } });
        }
    };
};
//Уточнить по поводу возврата токена при делите и обнове
export const dellUser = () => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem("token");
        console.log(accessToken);
        const resp = await axios.post("http://127.0.0.1:5000/api/user/delete", {
            accessToken,
        });
        if (resp.status == 200) {
            <p4>resp.message</p4>;
            <h3>resp.user</h3>;
            dispatch({ type: "DELL" });
        }
    };
    //на бєке сюрприз
};

/*
export const uppdateUser = (email, password) => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem("token");
        console.log(accessToken);
        const resp = await axios.post("http://127.0.0.1:5000/api/user/delete", {
            email,
            password,
            accessToken,
        });
        if (resp.status == 200) {
            (<h3>{resp.uppUser}</h3>), (<h3>{resp.user}</h3>);
            dispatch({ type: "UPPDATE" });
        }
    };
};
*/

const defaultStateUser = {
    isAuth: false,
    user: {},
};

const UserReducer = (stateUser = defaultStateUser, action) => {
    console.log(action);
    switch (action.type) {
        case "REGISTRATION": {
            console.log("reducer");
            if (Object.keys(action.payload).length != 0) {
                return { isAuth: true, user: action.payload };
            }
        }
        case "AUTHORIZATION": {
            if (Object.keys(action.payload).length != 0) {
                return { isAuth: true, user: action.payload };
            }
        }
        case "CHECKAUTH": {
            if (Object.keys(action.payload).length != 0) {
                return { isAuth: true, user: action.payload };
            }
        }
        case "DELL": {
            //Что нужно сюда вставить
        }
        case "UPPDATE": {
            if (Object.keys(action.payload).length != 0) {
                return { isAuth: true, user: action.payload };
            }
        }
        default: {
            return stateUser;
        }
    }
};

export const createDevice = (
    name,
    price,
    brandId,
    typeId,
    info,
    img,
    rating
) => {
    return async (dispatch) => {
        const formData = new FormData();

        /*
        [
            {key:"size",value:"xl"},
            {key:"color",value:"red"}
        ]
        */

        formData.append("name", name);
        formData.append("price", price);
        formData.append("brandId", brandId);
        formData.append("typeId", typeId);
        formData.append("info", JSON.stringify(info));
        formData.append("img", img);
        formData.append("rating", rating);

        const resp = await axios.post(
            "http://127.0.0.1:5000/api/device/create",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer JWT TOKEN",
                },
            }
        );

        if (resp.status == 200) {
            dispatch({
                type: "CREATE",
                payload: resp.data,
            });
        }
    };
};
export const dellDevice = (name) => {
    return async (dispatch) => {
        const resp = await axios.post("http://127.0.0.1:5000/api/device/dell", {
            name,
        });
        if (resp.status == 200) {
            dispatch({ type: "DELL" });
        }
    };
};
export const uppdateDevice = (name, newName, newPrice) => {
    return async (dispatch) => {
        const resp = await axios.post(
            "http://127.0.0.1:5000/api/device/chenge",
            {
                name,
                newName,
                newPrice,
            }
        );
        if (resp.status == 200) {
            dispatch({ type: "UPDATE" });
        }
    };
};

export const actionGetAllProducts = () => {
    return async (dispatch) => {
        const resp = await axios.get("http://127.0.0.1:5000/api/device");
        if (resp.status == 200) {
            console.log(resp.data);

            dispatch({ type: "GETALL", payload: resp.data });
        }
    };
};
export const actionGetOneProducts = () => {
    return async (dispatch) => {
        const resp = await axios.get("http://127.0.0.1:5000/api/device/:id");
        if (resp.status == 200) {
            console.log(resp.data);

            dispatch({ type: "GETONE", payload: resp.data });
        }
    };
};

const defaultStateProduct = {
    products: [],
    counts: 0,
};

const ProductReducer = (state = defaultStateProduct, action) => {
    switch (action.type) {
        case "CREATE": {
            return {
                products: [...state.products, action.payload],
                counts: state.counts + 1,
            };
        }
        case "DELL": {
            return {
                products: [action.payload, ...state.products],
                counts: state.counts - 1,
            };
        }
        case "GETALL": {
            return {
                products: action.payload.rows,
                count: action.payload.count,
            };
        }
        case "GETONE": {
            return {
                products: action.payload.rows,
                count: action.payload.count,
            };
        }
        case "UPDATE": {
            return {
                products: [...state.products, action.payload],
                count: action.payload.count,
            };
        }
        default: {
            return state;
        }
    }
};
export const createBrand = (name) => {
    return async (dispatch) => {
        const resp = await axios.post("http://127.0.0.1:5000/api/brand", {
            name: name,
        });
        console.log(resp.status);
        if (resp.status == 200) {
            localStorage.setItem("token", resp.data.token);
            dispatch({ type: "CREATEBRAND", payload: { name } });
        }

        dispatch({ type: "CREATEBRAND", payload: {} });
    };
};
export const getBrands = () => {
    return async (dispatch) => {
        const resp = await axios.get("http://127.0.0.1:5000/api/brand/all");

        if (resp.status == 200) {
            console.log(resp.data);

            dispatch({ type: "GETALLBRAND", payload: resp.data });
        }
    };
};
export const dellBrand = (name) => {
    return async (dispatch) => {
        const resp = await axios.post("http://127.0.0.1:5000/api/brand/dell", {
            name,
        });
        if (resp.status == 200) {
            dispatch({ type: "DELLBRAND" });
        }
    };
};
export const uppdateBrand = (name) => {
    return async (dispatch) => {
        const resp = await axios.post(
            "http://127.0.0.1:5000/api/brand/change",
            {
                name: name,
            }
        );
        if (resp.status == 200) {
            dispatch({ type: "CHANGEBRAND" });
        }
    };
};
const defaultStateBrand = {
    brands: [],
    counts: 0,
};
const TypeBrandReducer = (state = defaultStateBrand, action) => {
    switch (action.type) {
        case "CREATEBRAND": {
            return {
                brands: [...state.brands, action.payload],
                counts: state.counts + 1,
            };
        }
        case "GETALLBRAND": {
            return {
                brands: action.payload.rows,
                count: action.payload.count,
            };
        }
        case "CHANGEBRAND": {
            return {
                brands: [...state.brands, action.payload],
                counts: state.counts,
            };
        }
        case "DELLBRAND": {
            return { ...state, counts: state.counts - 1 };
        }
        default: {
            return state;
        }
    }
};

const store = configureStore({
    reducer: { UserReducer, ProductReducer, TypeBrandReducer },
    middleware: (middlewares) => middlewares(),
});
export default store;
