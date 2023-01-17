import { doc, setDoc, getDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
import Products from "../../components/Products/Products";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import "./style.default.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContextProvider";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { useState } from "react";

const Home = () => {
    const [category, setCategory] = useState("");

    return (
        <Container>
            <ShopHeader />
            <section className="py-5">
                <div className="container p-0">
                    <div className="row">
                        {/* SHOP SIDEBAR*/}
                        <div className="col-lg-3 order-2 order-lg-1">
                            <h5 className="text-uppercase mb-4">Categories</h5>
                            <div className="py-2 px-4 bg-dark text-white mb-3">
                                <strong className="small text-uppercase fw-bold">Fashion &amp; Acc</strong>
                            </div>
                            <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                                <li className="mb-2">
                                    <a
                                        className="reset-anchor"
                                        href="#!"
                                        onClick={() => {
                                            setCategory("jewelery");
                                        }}
                                    >
                                        Jewelery
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        className="reset-anchor"
                                        href="#!"
                                        onClick={() => {
                                            setCategory("men's clothing");
                                        }}
                                    >
                                        Men's clothing
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        className="reset-anchor"
                                        href="#!"
                                        onClick={() => {
                                            setCategory("women's clothing");
                                        }}
                                    >
                                        Women's clothing
                                    </a>
                                </li>
                            </ul>
                            <div className="py-2 px-4 bg-light mb-3">
                                <strong className="small text-uppercase fw-bold">Electronics</strong>
                            </div>
                            <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                                <li className="mb-2">
                                    <a
                                        className="reset-anchor"
                                        href="#!"
                                        onClick={() => {
                                            setCategory("electronics");
                                        }}
                                    >
                                        Electronics
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* SHOP LISTING*/}
                        <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                            <div className="row">
                                <Products category={category} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Home;
