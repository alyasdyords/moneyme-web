import React from 'react'
import { Form, Button, Col, Container} from 'react-bootstrap';
export default class Review extends React.Component {
    render() {
        return (
            <div className="content d-flex flex-wrap justify-content-center position-absolute w-100 h-100">
                <Form className="col-md-7">
                    <Container className="shadow p-5 mb-9 bg-white rounded" style={{borderWidth:1, borderStyle:"solid"}}>
                        <h1>Thank you for trusting Money me.</h1>
                        <h2>Give us a moment and we will contact you.</h2>
                    </Container>
                </Form>
            </div>
        )
    }
}