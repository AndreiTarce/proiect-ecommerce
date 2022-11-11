import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { signedInState } from "../../atoms/signedInState";
import { useRecoilState } from "recoil";

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useRecoilState(signedInState);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            setIsSignedIn(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate("/account");
        }
    }, [user]);

    return (
        <div>
            <h1>Sign in</h1>
            <div>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    );
};

export default SignIn;
