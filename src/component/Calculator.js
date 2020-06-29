import React from 'react'
import { Form, Button, Col, Container} from 'react-bootstrap';
import InputRange from 'react-input-range'
import {Redirect, Link} from 'react-router-dom';
import Review from './Review'
import { Textbox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import axios from 'axios';

const _url = "https://localhost:44381/api/";

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      id: this.props.location.search === "" ? this.props.location.quoteDetails.id :  this.props.location.search.replace('?', ''),
      title: this.props.location.quoteDetails ? this.props.location.quoteDetails.title : "",
      firstName: this.props.location.quoteDetails ? this.props.location.quoteDetails.firstName : "",
      lastName:  this.props.location.quoteDetails ? this.props.location.quoteDetails.lastName : "",
      mobile:  this.props.location.quoteDetails ? this.props.location.quoteDetails.mobile : "",
      email:  this.props.location.quoteDetails ? this.props.location.quoteDetails.email : "",
      amount:  this.props.location.quoteDetails ? this.props.location.quoteDetails.amount : 5000,
      terms:  this.props.location.quoteDetails ? this.props.location.quoteDetails.terms : 6,
      repayment:  this.props.location.quoteDetails ? this.props.location.quoteDetails.repayment : "",
      establishmentFee: 300,
      rate:  this.props.location.quoteDetails ? this.props.location.quoteDetails.rate : 9,
      validate: false,
      hasTitleError: this.props.location.quoteDetails ? this.props.location.quoteDetails.hasTitleError : true,
      hasFirstNameError: this.props.location.quoteDetails ? this.props.location.quoteDetails.hasFirstNameError :true,
      hasLastNameError: this.props.location.quoteDetails ? this.props.location.quoteDetails.hasLastNameError : true,
      hasMobileError: this.props.location.quoteDetails ? this.props.location.quoteDetails.hasMobileError : true,
      hasEmailError: this.props.location.quoteDetails ? this.props.location.quoteDetails.hasEmailError : true
    };
    console.log(this.state);
  }

 
  

  

  async componentDidMount() {
    let id = this.props.location.search.replace('?', '');
    if(id === "")
    {
      id= this.props.location.quoteDetails.id;
    }
    const res = await axios(_url + "Quotes/" + id )
      .then(async (res) => {
        console.log(JSON.stringify(res));
        return await res.data;
      }).catch(ex => {
        console.log("exception update quote.." + ex);
        throw ex;
      });
      await this.setState({
        id: this.props.location.search === "" ? res.id : this.props.location.search.replace('?', ''),
        title: res.title,
        firstName: res.firstName,
        lastName:  res.lastName,
        mobile:  res.mobile,
        email:  res.email,
        amount:  res.amountRequired,
        terms:  res.term,
        hasTitleError: false,
        hasFirstNameError: false,
        hasLastNameError: false,
        hasMobileError: false,
        hasEmailError: false,
      })
      console.log(this.state);
      return res;
    }
  

  onCalculate =() => {
    console.log(this.state);
    return <Redirect to="/review/"/>
  }
  validateForm = async (e) => {
    e.persist();
    e.preventDefault();
    await this.setState({ validate: true });
    console.log(this.state);
    const {
      hasTitleError,
      hasFirstNameError,
      hasLastNameError,
      hasEmailError,
      hasMobileError
    } = this.state;
    if (!hasTitleError && !hasFirstNameError && !hasLastNameError && !hasEmailError && !hasMobileError) {
      this.linkElement.click();
    }
  }
  render() {
    return (
      <div className="content d-flex flex-wrap justify-content-center position-absolute w-100 h-100">
          <Form className="align-items-left align-text-left col-md-6" onSubmit={this.validateForm} >
            <Container className="shadow p-10 mb-9 bg-white rounded" style={{borderWidth:1, borderStyle:"solid", padding:"50px"}}>
                <Form.Row className="justify-content-md-center">
                    <p style={styles.title} >Quote Calculator</p>
                  </Form.Row>
                  <Form.Row className="justify-content-md-center" style={{marginBottom:"50px"}} >
                    <InputRange
                        maxValue={15000}
                        minValue={2100}
                        step={100}
                        value={this.state.amount}
                        formatLabel={(value) => {
                          var formatter = new Intl.NumberFormat("en-US");
                          var x = formatter.format(value.toString().replace(/,/g, ""));
                          return '$' + x;
                        }}
                        
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
                        <Select
                          customStyleSelect={{fontSize:"18px", borderRadius: "5px", height: "29px"}}
                            attributesInput={{ 
                              id: 'title',
                              name: 'title',
                            }}
                            validate={this.state.validate}
                            validationCallback={res => this.setState({ hasTitleError: res })}
                            value={this.state.title} 
                            optionList={[
                              { id: '', name: 'Select title' },
                              { id: 'Mr.', name: 'Mr.' },
                              { id: 'Mrs.', name: 'Mrs.' },
                              { id: 'Miss', name: 'Miss' }
                            ]} 
                            onChange={(res, e) => {
                              e.persist(); 
                              this.setState({title : res.id})
                              
                            }}
                            onBlur={() => {}} 
                            // customStyleOptionListContainer={{ maxHeight: '200px', overflow: 'auto', fontSize: '14px' }} // Optional.[Object].Default: {}.
                            validationOption={{
                              name: 'title',
                              check: true,
                              required: true
                            }}
                          />                        
                        </Col>
                        <Col>
                            <Textbox
                              customStyleInput={{fontSize:"18px", borderRadius: "5px", height: "39px"}}
                              attributesInput={{ // Optional.
                                id: 'txtFirstName',
                                name: 'txtFirstName',
                                type: 'text',
                                placeholder: 'First Name',
                              }}
                              validate={this.state.validate}
                              validationCallback={res => { this.setState({ hasFirstNameError: res, validate: false })}}
                              value={this.state.firstName}
                              onChange={(name, e) => {
                                e.persist();
                                this.setState({ firstName: name });
                                console.log(e);
                              }} 
                              onBlur={(e) => {console.log(e)}} 
                              validationOption={{
                                name: 'First Name',
                                check: true,
                                required: true
                              }}
                            />                        
                        </Col>
                        <Col>
                        <Textbox
                            customStyleInput={{fontSize:"18px", borderRadius: "5px", height: "39px"}}
                              attributesInput={{ // Optional.
                                id: 'txtLastName',
                                name: 'txtLastName',
                                type: 'text',
                                placeholder: 'Last Name',
                              }}
                              validate={this.state.validate}
                              validationCallback={res => this.setState({ hasLastNameError: res, validate: false })}
                              value={this.state.lastName} 
                              onChange={(name, e) => {
                                e.persist();
                                this.setState({ lastName: name });
                                console.log(e);
                              }} 
                              onBlur={(e) => {console.log(e)}}
                              validationOption={{
                                name: 'Last Name',
                                check: true,
                                required: true
                              }}
                            />                             
                        </Col>
                        
                      </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                      <Textbox
                        customStyleInput={{fontSize:"18px", borderRadius: "5px", height: "39px"}}
                              attributesInput={{ 
                                id: 'txtEmail',
                                name: 'txtEmail',
                                type: 'text',
                                placeholder: 'youremail@domain.com',
                              }}
                              validate={this.state.validate}
                              validationCallback={res => this.setState({ hasEmailError: res })}
                              value={this.state.email}
                              onChange={(name, e) => {
                                e.persist();
                                this.setState({ email: name });
                                console.log(e);
                              }}
                              onBlur={(e) => {console.log(e)}}
                              validationOption={{
                                name: "Email",
                                reg: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                                regMsg: 'Please check your email format',
                                check: true,
                                required: true
                              }}
                            />                         
                      </Col>
                      <Col>
                      <Textbox
                        customStyleInput={{fontSize:"18px", borderRadius: "5px", height: "39px"}}
                              attributesInput={{ // Optional.
                                id: 'txtMobile',
                                name: 'txtMobile',
                                type: 'text',
                                placeholder: 'Mobile(+912 8087339090)',
                              }}
                              validate={this.state.validate}
                              validationCallback={res => this.setState({ hasMobileError: res })}
                              value={this.state.mobile}
                              onChange={(name, e) => {
                                e.persist();
                                this.setState({ mobile: name });
                                console.log(e);
                              }} 
                              onBlur={(e) => {console.log(e)}} 
                              validationOption={{
                                name: 'Mobile', 
                                reg: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                regMsg: 'Please check your mobile format',
                                check: true, 
                                required: true
                              }}
                            />                       
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row className="justify-content-md-center">
                    {/* <Button onClick={this.onCalculate} variant="success">Calculate quote</Button> */}
                    <Link to={{
                          pathname: "/review/",
                          quoteDetails: {
                            id: this.state.id,
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
                     }} onClick={ async (e) => {
                       var req = {
                          "id": this.state.id,
                          "amountRequired": this.state.amount,
                          "term": this.state.terms,
                          "title": this.state.title,
                          "firstName": this.state.firstName,
                          "lastName": this.state.lastName,
                          "mobile": this.state.mobile,
                          "email": this.state.email,
                          "createDate": new Date()
                       };
                          const res = axios({
                              method: 'put',
                              url: _url + "Quotes/" + this.state.id,
                              headers: { 'Content-Type': 'application/json' },
                              data: req
                          }).then(function (response) {
                              if (response.status === 200 && response.data.status === 200) {
                                  console.log(response);
                              } else {
                                console.log(response);
                              }
                          }).catch(function (error) {
                            console.log(error);
                          });

                        return res;
                      }
                     }
                     ref={input => this.linkElement = input}
                     className="btn btn-primary success shadow mb-9 pd-5" style={{display:"none"}}>Calculate quote</Link>
                     <input type="submit" onClick={this.validateForm} className="btn btn-primary success shadow mb-9 pd-5" value="Calculate quote" />
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