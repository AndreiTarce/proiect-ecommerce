import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

const addToCart = async (product, quantity, uid) => {
    await setDoc(doc(db, "users", uid), {
        uid: uid,
    });

    await addDoc(collection(db, `users/${uid}/cart`), {
        id: product.id,
        title: product.title,
        category: product.category,
        description: product.description,
        image: product.image,
        price: product.price,
        rating: product.rating,
        quantity: quantity,
    });
};

export default addToCart;
