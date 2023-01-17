const cartReloadReducer = (state = 0, action) => {
    switch (action.type) {
        case "RELOAD_CART":
            return (state += 1);
        default:
            return state;
    }
};

export default cartReloadReducer;
