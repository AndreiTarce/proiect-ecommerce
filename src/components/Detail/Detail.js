import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import addToCart from "../../pages/cart/addToCart";
import { UserAuth } from "../../context/AuthContextProvider";
import toast, { Toaster } from "react-hot-toast";

const Detail = () => {
    let params = new URL(document.location).searchParams;
    let productID = parseInt(params.get("id"));
    const productInfo = useRef({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { user } = UserAuth();

    const getProduct = async () => {
        const productRef = collection(db, "products");
        // Create a query against the collection.
        const q = query(productRef, where("id", "==", productID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productInfo.current = doc.data();
            console.log(productInfo.current);
        });
        setLoading(false);
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    useEffect(() => {
        getProduct();
    }, [loading]);

    if (!loading && user)
        return (
            <>
                <Toaster />
                <section className="py-5">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-lg-6">
                                {/* PRODUCT SLIDER*/}
                                <div className="row m-sm-0">
                                    <div className="col-sm-10 order-1 order-sm-2">
                                        <div className="swiper product-slider">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide h-auto">
                                                    <a
                                                        className="glightbox product-view"
                                                        href="img/product-detail-1.jpg"
                                                        data-gallery="gallery2"
                                                        data-glightbox="Product item 1"
                                                    >
                                                        <img
                                                            className="img-fluid"
                                                            src={productInfo.current.image}
                                                            alt="..."
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* PRODUCT DETAILS*/}
                            <div className="col-lg-6">
                                <ul className="list-inline mb-2 text-sm">
                                    {Array.from({ length: productInfo.current.rating.rate }, (_, index) => {
                                        return (
                                            <li className="list-inline-item m-0">
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className="fas fa-star small text-warning"
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <h1>{productInfo.current.title}</h1>
                                <p className="text-muted lead">${productInfo.current.price}</p>
                                <p className="text-sm mb-4">{productInfo.current.description}</p>
                                <div className="row align-items-stretch mb-4">
                                    <div className="col-sm-5 pr-sm-0">
                                        <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                                            <span className="small text-uppercase text-gray mr-4 no-select">
                                                Quantity
                                            </span>
                                            <div className="quantity">
                                                <input
                                                    className="form-control border-0 shadow-0 p-0"
                                                    type="text"
                                                    value={quantity}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 pl-sm-0">
                                        <a
                                            className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                                            href="#"
                                            onClick={() => {
                                                addToCart(productInfo.current, quantity, user.uid);
                                                const notify = () =>
                                                    toast(`Added ${quantity} item${quantity && "s"} to cart.`);
                                                notify();
                                            }}
                                        >
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                                <br />
                                <ul className="list-unstyled small d-inline-block">
                                    <li className="px-3 py-2 mb-1 bg-white">
                                        <strong className="text-uppercase">SKU:</strong>
                                        <span className="ms-2 text-muted">{productInfo.current.id}</span>
                                    </li>
                                    <li className="px-3 py-2 mb-1 bg-white text-muted">
                                        <strong className="text-uppercase text-dark">Category:</strong>
                                        <a className="reset-anchor ms-2" href="#!">
                                            {productInfo.current.category}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* DETAILS TABS*/}
                        <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a
                                    className="nav-link text-uppercase active"
                                    id="description-tab"
                                    data-bs-toggle="tab"
                                    href="#description"
                                    role="tab"
                                    aria-controls="description"
                                    aria-selected="true"
                                >
                                    Description
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content mb-5" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="description"
                                role="tabpanel"
                                aria-labelledby="description-tab"
                            >
                                <div className="p-4 p-lg-5 bg-white">
                                    <h6 className="text-uppercase">Product description </h6>
                                    <p className="text-muted text-sm mb-0">{productInfo.current.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
};

export default Detail;
