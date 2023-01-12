import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

const getCart = async (uid) => {
    const querySnapshot = await getDocs(collection(db, `users/${uid}/cart`));
    const cartItems = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        cartItems.push(doc.data());
    });
    return cartItems;
};

export default getCart;
