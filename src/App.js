import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import SignIn from "./pages/signin/SignIn";
import Protected from "./components/Protected/Protected";
import Account from "./pages/account/Account";
import Navigation from "./components/Navbar/Navigation";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Cart from "./pages/cart/Cart";
import Detail from "./components/Detail/Detail";
import Checkout from "./pages/checkout/Checkout";
import Success from "./pages/success/Success";
import Cancel from "./pages/cancel/Cancel";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route
                        path="/account"
                        element={
                            <Protected>
                                <Account />
                            </Protected>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Protected>
                                <Cart />
                            </Protected>
                        }
                    />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;
