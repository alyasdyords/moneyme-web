import React from 'react'
import { Form, Button, Col, Container} from 'react-bootstrap';
import InputRange from 'react-input-range'
import {Redirect, Link} from 'react-router-dom';
import Review from './Review'

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.location.quoteDetails ? this.props.location.quoteDetails.title : "Mr.",
      firstName: this.props.location.quoteDetails ? this.props.location.quoteDetails.firstName : "",
      lastName:  this.props.location.quoteDetails ? this.props.location.quoteDetails.lastName : "",
      mobile:  this.props.location.quoteDetails ? this.props.location.quoteDetails.mobile : "",
      email:  this.props.location.quoteDetails ? this.props.location.quoteDetails.email : "",
      amount:  this.props.location.quoteDetails ? this.props.location.quoteDetails.amount : 5000,
      terms:  this.props.location.quoteDetails ? this.props.location.quoteDetails.terms : 6,
      repayment:  this.props.location.quoteDetails ? this.props.location.quoteDetails.repayment : "",
      establishmentFee: 300,
      rate:  this.props.location.quoteDetails ? this.props.location.quoteDetails.rate : 9
    };
    console.log(this.state);
  }

  onCalculate =() => {
    console.log(this.state);
    return <Redirect to="/review/"/>
  }
  render() {
    return (
      <div className="content d-flex flex-wrap justify-content-center position-absolute w-100 h-100">
          <Form className="align-items-left align-text-left">
            <Container className="shadow p-5 mb-9 bg-white rounded" style={{borderWidth:1, borderStyle:"solid", padding:"50px"}}>
                <Form.Row className="justify-content-md-center">
                    <p style={styles.title} >Quote Calculator</p>
                  </Form.Row>
                  <Form.Row className="justify-content-md-center" style={{marginBottom:"50px"}} >
                    <InputRange
                        maxValue={15000}
                        minValue={2100}
                        step={100}
                        formatLabel={(value) => {
                          var formatter = new Intl.NumberFormat("en-US");
                          var x = formatter.format(value.toString().replace(/,/g, ""));
                          return '$' + x;
                        }}
                        value={this.state.amount}
                        onChange={value => this.setState({amount : value} )}
                        onChangeComplete={value => console.log(value)}
                        />
                        <Form.Label style={styles.label}>How much do you need</Form.Label>
                  </Form.Row>
                  <Form.Row className="justify-content-md-center" style={{marginBottom:"50px"}} >
                    <InputRange
                        maxValue={24}
                        minValue={3}
                        step={1}
                        value={this.state.terms}
                        formatLabel={value => `${value} months`}
                        onChange={value =>  this.setState( {terms:value })}
                        onChangeComplete={value => console.log(value)}
                        />
                        <Form.Label style={styles.label}>For how long?</Form.Label>
                  </Form.Row>      
                  <Form.Row className="justify-content-md-center w-50" style={{marginBottom:"50px"}} >
                    <InputRange
                        maxValue={12}
                        minValue={1}
                        step={.5}
                        value={this.state.rate}
                        formatLabel={value => `${value} %`}
                        onChange={value =>  this.setState( {rate:value })}
                        onChangeComplete={value => console.log(value)}
                        />
                        <Form.Label style={styles.label}>Interest rate</Form.Label>
                  </Form.Row>                             
                <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Row>
                        <Col>
                          <Form.Control as="select" id="selectTitle" required placeholder="Select title" value={this.state.title} onChange={event => {event.persist(); debugger; this.setState({title : event.target.value}) }}>
                              <option value="">Select title</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Miss.">Miss</option>
                          </Form.Control>
                        </Col>
                        <Col>
                          <Form.Control as="input" id="txtFirstName" required value={this.state.firstName} placeholder="First Name" onChange={event => {event.persist();this.setState({firstName : event.target.value} )}}></Form.Control>
                        </Col>
                        <Col>
                          <Form.Control as="input" id="txtLastName" required value={this.state.lastName}placeholder="Last Name" onChange={event => {event.persist();this.setState({lastName : event.target.value} )}}></Form.Control>
                        </Col>
                        
                      </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                        <Form.Control type="email" required placeholder="Your email@domain.com" value={this.state.email} onChange={event => {event.persist();this.setState({email : event.target.value} )}}></Form.Control>
                      </Col>
                      <Col>
                        <Form.Control type="tel" placeholder="Mobile number(123-23-234)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required value={this.state.mobile} onChange={event => {event.persist();this.setState({mobile : event.target.value} )}}></Form.Control>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row className="justify-content-md-center">
                    {/* <Button onClick={this.onCalculate} variant="success">Calculate quote</Button> */}
                    <Link to={{
                          pathname: "/review/",
                          quoteDetails: {
                            title: this.state.title,
                            firstName: this.state.firstName,
                            lastName: this.state.firstName,
                            mobile: this.state.mobile,
                            email: this.state.email,
                            amount: this.state.amount,
                            terms:  this.state.terms,
                            repayment:  this.state.repayment,
                            rate: this.state.rate
                          }
                     }} onClick={() => {
                       
                     }} className="btn btn-primary success shadow mb-9 pd-5" style={{display:"none"}}>Calculate quote</Link>
                      <input className="btn btn-primary success shadow mb-9 pd-5" type="submit" value="Calculate quote" />
                  </Form.Row>
                  <Form.Row className="justify-content-md-center">
                    <p style={styles.footer} >Quote does not affect your credit score</p>
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