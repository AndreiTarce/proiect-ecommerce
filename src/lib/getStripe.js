import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            "pk_test_51M2Bd9H1rXnXzXApuwHj1Fi1eKIHMIkKrgSiUCxsg2IjlBY4Azbjm5ZtQPSyCqtflaAnaTZDWzKTm4dz00e82iDU00tTEqT0ln"
        );
    }
    return stripePromise;
};

export default getStripe;
