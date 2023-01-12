import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faHeart } from "@fortawesome/free-solid-svg-icons";
import addToCart from "../../pages/cart/addToCart";
import { UserAuth } from "../../context/AuthContextProvider";

const Product = ({ product }) => {
    const { user } = UserAuth();

    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product text-center">
                <div className="mb-3 position-relative">
                    <div className="badge text-white bg-" />
                    <a className="d-block" href={`/detail?id=${product.id}`}>
                        <img
                            className="img-fluid w-100"
                            src={product.image}
                            alt="..."
                            style={{ objectFit: "contain", height: "250px" }}
                        />
                    </a>
                    <div className="product-overlay">
                        <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0">
                                <a
                                    className="btn btn-sm btn-dark"
                                    onClick={() => {
                                        addToCart(product, 1, user.uid);
                                    }}
                                >
                                    Add to cart
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <h6>
                    {" "}
                    <a className="reset-anchor" href="/detail?id=4">
                        {product.title}
                    </a>
                </h6>
                <p className="small text-muted">{product.price}$</p>
            </div>
        </div>
    );
};

export default Product;
