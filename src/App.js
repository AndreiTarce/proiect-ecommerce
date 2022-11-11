import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import SignIn from "./pages/signin/SignIn";
import Protected from "./components/Protected/Protected";
import Account from "./pages/account/Account";
import Navigation from "./components/Navbar/Navigation";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route
                        path="/account"
                        element={
                            <Protected>
                                <Account />
                            </Protected>
                        }
                    />
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;
