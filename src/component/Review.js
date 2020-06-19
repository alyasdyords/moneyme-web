import React from 'react'
import { Form, Button, Col, Container} from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import Calculator from './Calculator';

export default class Review extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.location)
    this.state = {
        title:  this.props.location.quoteDetails.title,
      name: this.props.location.quoteDetails.firstName + ' ' + this.props.location.quoteDetails.lastName,
      mobile: this.props.location.quoteDetails.mobile,
      email: this.props.location.quoteDetails.email,
      amount: this.props.location.quoteDetails.amount,
      terms: this.props.location.quoteDetails.terms,
      repayment: this.props.location.quoteDetails.repayment,
      rate: this.props.location.quoteDetails.rate,
      establishmentFee: 400,
      total: 0
    };

    
  }

  pmt = (rate, nperiod, pv, fv, type) => {
      debugger;
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate === 0) return -(pv + fv)/nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) {
        pmt /= (1 + rate);
    };

    return pmt;
}  
  componentDidMount(){
    let monthly = this.pmt(this.state.rate/1200, this.state.terms,-this.state.amount,0,0);
    this.setState({repayment: '$'+monthly.toFixed(2), total:((monthly*this.state.terms)-this.state.amount).toFixed(2)});
  }
   
  render() {

    
    return (
        <div className="content d-flex flex-wrap justify-content-center position-absolute w-100 h-100">
            <Form className="col-md-5">
                <Container className="shadow p-5 mb-9 bg-white rounded" style={{borderWidth:1, borderStyle:"solid", padding:"50px"}}>
                    <Form.Group>
                        <Form.Row className="justify-content-md-center">
                            <p style={styles.title} >Your quote</p>
                        </Form.Row>
                        <Form.Row >
                            <Col >
                                <Form.Label>Your Information</Form.Label>
                            </Col>
                            <Col className="col-md-6 text-right">
                                <a style={styles.coloredLabel}>Edit</a>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label style={styles.label}>Name</Form.Label>
                            </Col>
                            <Col className="col-md-6 text-right">
                                <Form.Label style={styles.label}>{this.state.title + ' ' + this.state.name}</Form.Label>
                            </Col>
                        </Form.Row>                
                        <Form.Row>
                            <Col>
                                <Form.Label style={styles.label}>Mobile</Form.Label>
                            </Col>
                            <Col  className="col-md-6 text-right">
                                <Form.Label style={styles.label}>{this.state.mobile}</Form.Label>
                            </Col>
                        </Form.Row>                 
                        <Form.Row>
                            <Col>
                                <Form.Label style={styles.label}>Email</Form.Label>
                            </Col>
                            <Col  className="col-md-6 text-right">
                                <Form.Label style={styles.label}>{this.state.email}</Form.Label>
                            </Col>
                        </Form.Row>  
                    </Form.Group>    
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>Finance Details</Form.Label>
                            </Col>
                            <Col className="col-md-6 text-right">
                            <a style={styles.coloredLabel}>Edit</a>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label style={styles.mediumLabel}>Finance Amount</Form.Label>
                            </Col>
                            <Col  className="col-md-6 text-right">
                                <Form.Label style={styles.coloredLabel}>${this.state.amount}</Form.Label>
                            </Col>
                        </Form.Row>                            
                        <Form.Row>
                            <Col className="col-md-9">
                                <hr style={{borderStyle: "dashed"}}></hr>
                            </Col>
                            <Col  className="col-md-3 text-right">
                                <Form.Label style={styles.label}>over 24 months</Form.Label>
                            </Col>
                        </Form.Row>                            
                        <Form.Row>
                            <Col>
                                <Form.Label style={styles.mediumLabel}>Repayments from</Form.Label>
                            </Col>
                            <Col  className="col-md-6 text-right">
                                <Form.Label style={styles.coloredLabel}>{this.state.repayment}</Form.Label>
                            </Col>
                        </Form.Row>                            
                        <Form.Row>
                            <Col className="col-md-10">
                                <hr style={{borderStyle: "dashed"}}></hr>
                            </Col>
                            <Col  className="col-md-2 text-right">
                                <Form.Label style={styles.label}>Monthly</Form.Label>
                            </Col>
                        </Form.Row>                                  
                    </Form.Group>           
                        <Form.Row className="justify-content-md-center">
                            <Link to="/" className="btn btn-primary success shadow mb-9 pd-5">Apply now</Link>
                        </Form.Row>
                        <Form.Row className="justify-content-md-center">
                            <p style={styles.footer}>Your repayments will consist of an establishment fee of ${this.state.establishmentFee} and interest of ${this.state.total}. The repayment amount is based on the variables selected, is subject to our assessment and suitability, and other important terms and conditions apply.*</p>
                        </Form.Row>
                </Container>
            </Form>
            </div>
        );

    }
}




const styles = {
  footer: {
    color: "silver",
    fontStyle: "italic"
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  },
  label:{
    color:"silver",
    fontSize: "14px"
  },
  mediumLabel:{
    color:"silver",
    fontSize: "16px"
  },
  coloredLabel:{
    color:"#04D7DE",
    fontSize: "16px"
  }

}