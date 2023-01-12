import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import Product from "./Product";

const Products = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const products = useSelector((state) => state.productList);

    useEffect(() => {
        const tripsRef = collection(db, `products`);
        const tripsQuery = query(tripsRef);
        onSnapshot(
            tripsQuery,
            (querySnapshot) => {
                const changes = querySnapshot.docChanges();
                changes.forEach((change) => {
                    dispatch({ type: "ADD_PRODUCT_TO_LIST", payload: change.doc.data() });
                });
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    if (!loading)
        return (
            <>
                {products.map((product) => (
                    <Product product={product} key={product.title} />
                ))}
            </>
        );
};

export default Products;
