import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import getCart from "./getCart";
import { UserAuth } from "../../context/AuthContextProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft, faLongArrowAltRight, faGift } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        getCart(user.uid).then((result) => {
            setCartItems(result);
            setLoading(false);
        });
    }, [user]);

    useEffect(() => {
        cartItems.forEach((item) => {
            console.log(item.price);
            setCartTotal((oldTotal) => oldTotal + item.price * item.quantity);
        });
        console.log(cartTotal);
    }, [cartItems]);

    if (!loading && cartTotal > 0)
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
                                            {cartItems.map((item) => (
                                                <tr key={item.id}>
                                                    <th className="ps-0 py-3 border-light" scope="row">
                                                        <div className="d-flex align-items-center">
                                                            <a
                                                                className="reset-anchor d-block animsition-link"
                                                                href={`/detail?id=${item.id}`}
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt="..."
                                                                    width={70}
                                                                    style={{ objectFit: "contain" }}
                                                                />
                                                            </a>
                                                            <div className="ms-3">
                                                                <strong className="h6">
                                                                    <a
                                                                        className="reset-anchor animsition-link"
                                                                        href={`/detail?id=${item.id}`}
                                                                    >
                                                                        {item.title}
                                                                    </a>
                                                                </strong>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <td className="p-3 align-middle border-light">
                                                        <p className="mb-0 small">${item.price}</p>
                                                    </td>
                                                    <td className="p-3 align-middle border-light">
                                                        <div className="border d-flex align-items-center justify-content-between px-3">
                                                            <span className="small text-uppercase text-gray headings-font-family">
                                                                Quantity
                                                            </span>
                                                            <div className="quantity">
                                                                <input
                                                                    className="form-control form-control-sm border-0 shadow-0 p-0"
                                                                    type="text"
                                                                    defaultValue={item.quantity}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 align-middle border-light">
                                                        <p className="mb-0 small">${item.price * item.quantity}</p>
                                                    </td>
                                                    <td className="p-3 align-middle border-light">
                                                        <a className="reset-anchor" href="">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </a>
                                                    </td>
                                                </tr>
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
                                                <span className="text-muted small">${cartTotal}</span>
                                            </li>
                                            <li className="border-bottom my-2" />
                                            <li className="d-flex align-items-center justify-content-between mb-4">
                                                <strong className="text-uppercase small font-weight-bold">Total</strong>
                                                <span>${cartTotal}</span>
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
