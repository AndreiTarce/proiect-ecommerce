import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import Product from "./Product";
import { useCollection } from "react-firebase-hooks/firestore";

const Products = ({ category }) => {
    const productsRef = collection(db, `products`);
    const filteredProductsQuery = query(productsRef, where("category", "==", category));
    const productsQuery = query(productsRef);
    const [filteredSnapshot, loading, error] = useCollection(filteredProductsQuery);
    const [unfilteredSnapshot, unfilteredLoading, unfilteredError] = useCollection(productsQuery);
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        if (category !== "") {
            setFiltered(true);
        }
    }, [category]);

    if (error || unfilteredError) return <p>There was a problem loading the products. Try again.</p>;
    if (loading || unfilteredLoading) return <LoaderSpinner />;

    return (
        <>
            {!filtered &&
                unfilteredSnapshot.docs.map((product) => (
                    <Product product={product.data()} key={product.data().title} />
                ))}
            {filtered &&
                filteredSnapshot.docs.map((product) => <Product product={product.data()} key={product.data().title} />)}
        </>
    );
};

export default Products;
