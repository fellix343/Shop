import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

/*

Доделать бекенд удаление изменение и т.д
Зайти на фронт и сделать все запросы тут 

*/
