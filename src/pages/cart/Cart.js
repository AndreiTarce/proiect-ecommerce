import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import getCart from "./getCart";
import { UserAuth } from "../../context/AuthContextProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft, faLongArrowAltRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase";
import { doc, deleteDoc, query, collection, where, getDocs, onSnapshot } from "firebase/firestore";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useCollection } from "react-firebase-hooks/firestore";

const Cart = () => {
    const { user } = UserAuth();
    const [cartTotal, setCartTotal] = useState(0);
    const [snapshot, loading, error] = useCollection(query(collection(db, `users/${user.uid}/cart`)));

    const deleteItemFromCart = async (itemId) => {
        const q = query(collection(db, `users/${user.uid}/cart`), where("id", "==", itemId));
        const querySnapshot = await getDocs(q);
        await querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    };

    useEffect(() => {
        setCartTotal(0);
        if (snapshot) {
            snapshot.docs.forEach((item) => {
                setCartTotal((oldTotal) => oldTotal + item.data().price * item.data().quantity);
            });
        }
    }, [snapshot]);

    if (!loading)
        return (
            <>
                <div className="container">
                    {/* HERO SECTION*/}
                    <section className="py-5 bg-light">
                        <div className="container">
                            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                                <div className="col-lg-6">
                                    <h1 className="h2 text-uppercase mb-0">Cart</h1>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                            <li className="breadcrumb-item">
                                                <a className="text-dark" href="/">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Cart
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-5">
                        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
                        <div className="row">
                            <div className="col-lg-8 mb-4 mb-lg-0">
                                {/* CART TABLE*/}
                                <div className="table-responsive mb-4">
                                    <table className="table text-nowrap">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="border-0 p-3" scope="col">
                                                    {" "}
                                                    <strong className="text-sm text-uppercase">Product</strong>
                                                </th>
                                                <th className="border-0 p-3" scope="col">
                                                    {" "}
                                                    <strong className="text-sm text-uppercase">Price</strong>
                                                </th>
                                                <th className="border-0 p-3" scope="col">
                                                    {" "}
                                                    <strong className="text-sm text-uppercase">Quantity</strong>
                                                </th>
                                                <th className="border-0 p-3" scope="col">
                                                    {" "}
                                                    <strong className="text-sm text-uppercase">Total</strong>
                                                </th>
                                                <th className="border-0 p-3" scope="col">
                                                    {" "}
                                                    <strong className="text-sm text-uppercase" />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-0">
                                            {snapshot.empty && <p className="m-2">Your cart is empty.</p>}
                                            {snapshot.docs.map((item) => (
                                                <CartItem
                                                    item={item.data()}
                                                    key={item.data().id}
                                                    user={user}
                                                    onClick={() => {
                                                        deleteItemFromCart(item.data().id);
                                                    }}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* CART NAV*/}
                                <div className="bg-light px-4 py-3">
                                    <div className="row align-items-center text-center">
                                        <div className="col-md-6 mb-3 mb-md-0 text-md-start">
                                            <a className="btn btn-link p-0 text-dark btn-sm" href="/">
                                                <FontAwesomeIcon icon={faLongArrowAltLeft} classname="me-2" /> Continue
                                                shopping
                                            </a>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <a className="btn btn-outline-dark btn-sm" href="/checkout">
                                                Procceed to checkout
                                                <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-2" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ORDER TOTAL*/}
                            <div className="col-lg-4">
                                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                    <div className="card-body">
                                        <h5 className="text-uppercase mb-4">Cart total</h5>
                                        <ul className="list-unstyled mb-0">
                                            <li className="d-flex align-items-center justify-content-between">
                                                <strong className="text-uppercase small font-weight-bold">
                                                    Subtotal
                                                </strong>
                                                <span className="text-muted small">
                                                    ${Math.round((cartTotal + Number.EPSILON) * 100) / 100}
                                                </span>
                                            </li>
                                            <li className="border-bottom my-2" />
                                            <li className="d-flex align-items-center justify-content-between mb-4">
                                                <strong className="text-uppercase small font-weight-bold">Total</strong>
                                                <span>${Math.round((cartTotal + Number.EPSILON) * 100) / 100}</span>
                                            </li>
                                            <li>
                                                <form action="#">
                                                    <div className="input-group mb-0">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter your coupon"
                                                        />
                                                        <button className="btn btn-dark btn-sm w-100" type="submit">
                                                            {" "}
                                                            <FontAwesomeIcon icon={faGift} className="me-2" />
                                                            Apply coupon
                                                        </button>
                                                    </div>
                                                </form>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
};

export default Cart;
