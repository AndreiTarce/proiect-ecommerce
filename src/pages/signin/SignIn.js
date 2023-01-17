import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { signedInState } from "../../atoms/signedInState";
import { useRecoilState } from "recoil";
import { Container } from "react-bootstrap";

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
        <Container>
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">Sign in</h1>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
            <p>To access all of the shop's features you have to be signed in as a user.</p>
            <GoogleButton onClick={handleGoogleSignIn} className="mb-3" />
            <a className="btn btn-outline-dark btn-sm" href="/">
                Return to shop
            </a>
        </Container>
    );
};

export default SignIn;
