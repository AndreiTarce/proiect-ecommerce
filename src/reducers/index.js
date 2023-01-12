import { combineReducers } from "redux";
import productListReducer from "./productList";
import productListLoading from "./productListLoading";

const rootReducer = combineReducers({
    productList: productListReducer,
    productListLoading,
});

export default rootReducer;
