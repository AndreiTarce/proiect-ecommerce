import { useEffect } from "react";
import getCart from "../cart/getCart";
import { UserAuth } from "../../context/AuthContextProvider";
import { useState } from "react";
import getStripe from "../../lib/getStripe";
import { db } from "../../firebase";
import {
    doc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
} from "firebase/firestore";

const Checkout = () => {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [userInfo, setUserInfo] = useState({});

    const handleUserInput = (e) => {
        const property = e.target.id;
        let updatedValue = {};
        updatedValue[property] = e.target.value;
        setUserInfo((userInfo) => ({
            ...userInfo,
            ...updatedValue,
        }));
    };

    const deleteCart = async () => {
        const querySnapshot = await getDocs(
            collection(db, `users/${user.uid}/cart`)
        );
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    const sendOrder = async () => {
        await setDoc(doc(db, "customers", user.uid), {
            uid: user.uid,
        });
        await addDoc(collection(db, `customers/${user.uid}/orders`), userInfo);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        sendOrder();
        deleteCart();
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: "price_1MQbA3H1rXnXzXApNR5OZiHb",
                    quantity: 1,
                },
            ],
            mode: "payment",
            successUrl: `https://ecommerce-2416d.web.app/success`,
            cancelUrl: `https://ecommerce-2416d.web.app/cancel`,
            customerEmail: "customer@email.com",
        });
        console.warn(error.message);
    };

    useEffect(() => {
        getCart(user.uid).then((result) => {
            setCartItems(result);
            setLoading(false);
        });
    }, [user]);

    useEffect(() => {
        setUserInfo((userInfo) => ({
            ...userInfo,
            cart: cartItems,
        }));
    }, [loading]);

    useEffect(() => {
        cartItems.forEach((item) => {
            setCartTotal((oldTotal) => oldTotal + item.price * item.quantity);
        });
    }, [cartItems]);

    useEffect(() => {
        setUserInfo((userInfo) => ({
            ...userInfo,
            total: cartTotal,
        }));
    }, [cartTotal]);

    if (!loading)
        return (
            <>
                <div className="container">
                    {/* HERO SECTION*/}
                    <section className="py-5 bg-light">
                        <div className="container">
                            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                                <div className="col-lg-6">
                                    <h1 className="h2 text-uppercase mb-0">
                                        Checkout
                                    </h1>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                            <li className="breadcrumb-item">
                                                <a
                                                    className="text-dark"
                                                    href="/"
                                                >
                                                    Home
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a
                                                    className="text-dark"
                                                    href="/cart"
                                                >
                                                    Cart
                                                </a>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Checkout
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-5">
                        {/* BILLING ADDRESS*/}
                        <h2 className="h5 text-uppercase mb-4">
                            Billing details
                        </h2>
                        <div className="row">
                            <div className="col-lg-8">
                                <form action="#" onSubmit={onSubmitHandler}>
                                    <div className="row gy-3">
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="firstName"
                                            >
                                                First name{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="firstName"
                                                placeholder="Enter your first name"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="lastName"
                                            >
                                                Last name{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="lastName"
                                                placeholder="Enter your last name"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="email"
                                            >
                                                Email address{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="email"
                                                id="email"
                                                placeholder="e.g. Jason@example.com"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="phone"
                                            >
                                                Phone number{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="tel"
                                                id="phone"
                                                placeholder="e.g. +02 245354745"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="company"
                                            >
                                                Company name (optional){" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="company"
                                                placeholder="Your company name"
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="country"
                                            >
                                                Country
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="country"
                                                placeholder="Your country"
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="address"
                                            >
                                                Address line 1{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="address"
                                                placeholder="House number and street name"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="addressalt"
                                            >
                                                Address line 2{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="addressalt"
                                                placeholder="Apartment, Suite, Unit, etc (optional)"
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="city"
                                            >
                                                Town/City{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="city"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                className="form-label text-sm text-uppercase"
                                                htmlFor="state"
                                            >
                                                State/County{" "}
                                            </label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                id="state"
                                                required
                                                onChange={handleUserInput}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <button
                                                className="btn btn-link text-dark p-0 shadow-0"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#alternateAddress"
                                            ></button>
                                        </div>
                                        <div
                                            className="collapse"
                                            id="alternateAddress"
                                        >
                                            <div className="row gy-3">
                                                <div className="col-12 mt-4">
                                                    <h2 className="h4 text-uppercase mb-4">
                                                        Alternative billing
                                                        details
                                                    </h2>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="firstName2"
                                                    >
                                                        First name{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="firstName2"
                                                        placeholder="Enter your first name"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="lastName2"
                                                    >
                                                        Last name{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="lastName2"
                                                        placeholder="Enter your last name"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="email2"
                                                    >
                                                        Email address{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="email"
                                                        id="email2"
                                                        placeholder="e.g. Jason@example.com"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="phone2"
                                                    >
                                                        Phone number{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="tel"
                                                        id="phone2"
                                                        placeholder="e.g. +02 245354745"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="company2"
                                                    >
                                                        Company name (optional){" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="company2"
                                                        placeholder="Your company name"
                                                    />
                                                </div>
                                                <div className="col-lg-6 form-group">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="countryAlt"
                                                    >
                                                        Country
                                                    </label>
                                                    <select
                                                        className="country"
                                                        id="countryAlt"
                                                        data-customclass="form-control form-control-lg rounded-0"
                                                    >
                                                        <option value>
                                                            Choose your country
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-12">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="address2"
                                                    >
                                                        Address line 1{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="address2"
                                                        placeholder="House number and street name"
                                                    />
                                                </div>
                                                <div className="col-lg-12">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="addressalt2"
                                                    >
                                                        Address line 2{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="addressalt2"
                                                        placeholder="Apartment, Suite, Unit, etc (optional)"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="city2"
                                                    >
                                                        Town/City{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="city2"
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        className="form-label text-sm text-uppercase"
                                                        htmlFor="state2"
                                                    >
                                                        State/County{" "}
                                                    </label>
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type="text"
                                                        id="state2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <button
                                                className="btn btn-dark"
                                                type="submit"
                                            >
                                                Place order
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* ORDER SUMMARY*/}
                            <div className="col-lg-4">
                                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                    <div className="card-body">
                                        <h5 className="text-uppercase mb-4">
                                            Your order
                                        </h5>
                                        <ul className="list-unstyled mb-0">
                                            {cartItems.map((item) => (
                                                <>
                                                    <li className="d-flex align-items-center justify-content-between">
                                                        <strong className="small fw-bold">
                                                            {item.title}
                                                        </strong>
                                                        <span className="text-muted small">
                                                            $
                                                            {item.price *
                                                                item.quantity}
                                                        </span>
                                                    </li>
                                                    <li className="border-bottom my-2" />
                                                </>
                                            ))}
                                            <li className="d-flex align-items-center justify-content-between">
                                                <strong className="small fw-bold">
                                                    TOTAL
                                                </strong>
                                                <span className="text-muted small">
                                                    $
                                                    {Math.round(
                                                        (cartTotal +
                                                            Number.EPSILON) *
                                                            100
                                                    ) / 100}
                                                </span>
                                            </li>
                                            <li className="border-bottom my-2" />
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

export default Checkout;
