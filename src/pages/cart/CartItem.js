import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
    const [itemQuantity, setItemQuantity] = useState(props.item.quantity);
    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setItemQuantity(e.target.value);
        setFirstLoad(false);
    };

    const updateItemQuantity = async () => {
        const q = query(collection(db, `users/${props.user.uid}/cart`), where("id", "==", props.item.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //
            updateDoc(doc.ref, {
                quantity: itemQuantity,
            });
            console.log(props.item.quantity);
        });
    };

    useEffect(() => {
        if (itemQuantity && !firstLoad) {
            updateItemQuantity();
            dispatch({ type: "RELOAD_CART" });
        }
    }, [itemQuantity]);

    return (
        <tr key={props.item.id}>
            <th className="ps-0 py-3 border-light" scope="row">
                <div className="d-flex align-items-center">
                    <a className="reset-anchor d-block animsition-link" href={`/detail?id=${props.item.id}`}>
                        <img src={props.item.image} alt="..." width={70} style={{ objectFit: "contain" }} />
                    </a>
                    <div className="ms-3">
                        <strong className="h6">
                            <a className="reset-anchor animsition-link" href={`/detail?id=${props.item.id}`}>
                                {props.item.title}
                            </a>
                        </strong>
                    </div>
                </div>
            </th>
            <td className="p-3 align-middle border-light">
                <p className="mb-0 small">${props.item.price}</p>
            </td>
            <td className="p-3 align-middle border-light">
                <div className="border d-flex align-items-center justify-content-between px-3">
                    <span className="small text-uppercase text-gray headings-font-family">Quantity</span>
                    <div className="quantity">
                        <input
                            className="form-control form-control-sm border-0 shadow-0 p-0"
                            type="text"
                            value={itemQuantity}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
            </td>
            <td className="p-3 align-middle border-light">
                <p className="mb-0 small">${props.item.price * props.item.quantity}</p>
            </td>
            <td className="p-3 align-middle border-light">
                <a className="reset-anchor" href="#" onClick={props.onClick}>
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            </td>
        </tr>
    );
};

export default CartItem;
