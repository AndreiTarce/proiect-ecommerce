import { combineReducers } from "redux";
import productListReducer from "./productList";
import productListLoading from "./productListLoading";
import cartReloadReducer from "./cartReload";

const rootReducer = combineReducers({
    productList: productListReducer,
    productListLoading,
    cartReload: cartReloadReducer,
});

export default rootReducer;
