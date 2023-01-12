import React from "react";
import { UserAuth } from "../../context/AuthContextProvider";
import LoginButton from "../../components/LoginButton";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { Container, Card, Image, Button } from "react-bootstrap";

const Account = () => {
    const { user } = UserAuth();
    let image;
    if (user) {
        image = user.photoURL;
    }

    if (!image) return <LoaderSpinner />;

    if (image)
        return (
            <Container>
                <Card className="text-center" style={{ marginTop: "2rem" }}>
                    <Card.Header as="h2">Your account</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Image
                                className="m-2"
                                roundedCircle
                                referrerPolicy="no-referrer"
                                src={user.photoURL.replace("s96-c", "s400-c")}
                                height={200}
                                width={200}
                            />
                            <Card.Title as="h3">{user.displayName}</Card.Title>
                            <Card.Subtitle className="m-2 text-muted">
                                Account created at: {user.metadata.creationTime}
                            </Card.Subtitle>
                            <Card.Subtitle className="m-2 text-muted">
                                Last sign in: {user.metadata.lastSignInTime}
                            </Card.Subtitle>
                        </Card.Text>
                        <Card.Link></Card.Link>
                        <Card.Link href="#">
                            <LoginButton />
                        </Card.Link>
                    </Card.Body>
                </Card>
            </Container>
        );
};

export default Account;
