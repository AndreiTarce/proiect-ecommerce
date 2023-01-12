const productListReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO_LIST":
            return [...state, action.payload];
        default:
            return state;
    }
};

export default productListReducer;
