import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContextProvider";
import Alert from "react-bootstrap/Alert";

const Protected = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return (
            <>
                <Navigate to="/" />
            </>
        );
    }

    return children;
};

export default Protected;
