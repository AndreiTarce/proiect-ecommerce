import { Container } from "react-bootstrap";

const Success = () => {
    return (
        <Container>
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">Order received</h1>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
            <p>Thank you. Your order has been received.</p>
            <a className="btn btn-outline-dark btn-sm" href="/">
                Return to shop
            </a>
        </Container>
    );
};

export default Success;
