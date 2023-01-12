import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "./firebase";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/Home/style.default.css";

import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { createStore } from "redux";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./vendor/glightbox/css/glightbox.min.css";
import "./vendor/nouislider/nouislider.min.css";
import "./vendor/choices.js/public/assets/styles/choices.min.css";
import "./vendor/swiper/swiper-bundle.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

root.render(
    <Provider store={store}>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
