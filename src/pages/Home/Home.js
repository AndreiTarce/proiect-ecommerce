import { doc, setDoc, getDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
import Products from "../../components/Products/Products";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import ShopHeader from "../../components/ShopHeader/ShopHeader";
import "./style.default.css";

const Home = () => {
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
                                    <a className="reset-anchor" href="#!">
                                        Women's T-Shirts
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Men's T-Shirts
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Dresses
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Novelty socks
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Women's sunglasses
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Men's sunglasses
                                    </a>
                                </li>
                            </ul>
                            <div className="py-2 px-4 bg-light mb-3">
                                <strong className="small text-uppercase fw-bold">Health &amp; Beauty</strong>
                            </div>
                            <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Shavers
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        bags
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Cosmetic
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Nail Art
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Skin Masks &amp; Peels
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Korean cosmetics
                                    </a>
                                </li>
                            </ul>
                            <div className="py-2 px-4 bg-light mb-3">
                                <strong className="small text-uppercase fw-bold">Electronics</strong>
                            </div>
                            <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Electronics
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        USB Flash drives
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Headphones
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Portable speakers
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Cell Phone bluetooth headsets
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="reset-anchor" href="#!">
                                        Keyboards
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* SHOP LISTING*/}
                        <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                            <div className="row">
                                <Products />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Home;
