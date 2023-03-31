
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner,Navbar,NavDropdown,NavItem,Nav } from 'react-bootstrap';
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";

import "./App.css";

function Home(props) {
console.log(props);


const [web3, setweb3] = useState(null)
const [accounts, setaccounts] = useState(null)
const [contract, setcontract] = useState(null)
const [flag, setflag] = useState(0)
const [event, setevent] = useState("login")

const [accountdetails, setaccountdetails] = useState(null)
let item={
    name:"1",
    price:"hdg"
}

useEffect(() => {
// console.log("mount");

load_data()


}, [flag])


const load_data = (async () => {

try {
// console.log("try");
// Get network provider and web3 instance.
const web3 = await getWeb3();
// Use web3 to get the user's accounts.
const accounts = await web3.eth.getAccounts();
setaccountdetails(accounts)

// Get the contract instance.
const networkId = await web3.eth.net.getId();
const deployedNetwork = SimpleStorageContract.networks[networkId];
const instance = new web3.eth.Contract(
SimpleStorageContract.abi,
deployedNetwork && deployedNetwork.address,
);

// Set web3, accounts, and contract to the state, and then proceed with an
// example of interacting with the contract's methods.
// this.setState({ web3, accounts, contract: instance }, this.runExample);
setweb3(instance)
setaccounts(instance)
setcontract(instance)
// console.log(instance);
// runExample(instance)
// console.log(contract);
} catch (error) {
// Catch any errors for any of the above operations.
alert(
`Failed to load web3, accoun deployedNetwork && deployedNetwork.address,
ts, or contract. Check console for details.`,
);
console.error(error);
}

})

return(
   <>
   <Container fluid>
  
   <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Button variant="outline-success " rounded  className="mx-2">Search</Button>
            <Button variant="outline-success" className="mx-2">Search</Button>
            <Button variant="outline-success" className="mx-2">Search</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
<div class="jumbotron bg-light py-3">
  <h1 class="display-4">Hello, Ashwin!</h1>
  <p class="lead">Your Available Balanace is $ 12.09 Happy Shopping!!</p>

 
 
</div>
<Container  className="mt-4">
<Row>
<Col lg={2} className="">
    <Card style={{ width: '11rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className="text-center">
         $18
        </Card.Text>
        <Card.Text className="text-center">
         <i>neem plant</i>
        </Card.Text>
      
        <div className="d-flex flex-row justify-content-around mt-0">
      <div className="">
      <Button variant="light" className="px-3">-</Button>
      </div>
      <div className="mt-1">
  <p>2</p>
      </div>
      <div className="">
      <Button variant="light sm">+</Button>
      
      </div>
    
    </div>

    <div className="d-flex flex-row justify-content-around ">
    <Button variant="primary" className="px-5 mt-1 " size='sm'>Buy</Button>
    
    </div>
   
      </Card.Body>
    </Card>
    </Col>

    <Col lg={2} className="">
    <Card style={{ width: '11rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className="text-center">
         $18
        </Card.Text>
        <Card.Text className="text-center">
         <i>neem plant</i>
        </Card.Text>
      
        <div className="d-flex flex-row justify-content-around mt-0">
      <div className="">
      <Button variant="light" className="px-3">-</Button>
      </div>
      <div className="mt-1">
  <p>2</p>
      </div>
      <div className="">
      <Button variant="light sm">+</Button>
      
      </div>
    
    </div>

    <div className="d-flex flex-row justify-content-around ">
    <Button variant="primary" className="px-5 mt-1 " size='sm'>Buy</Button>
    
    </div>
   
      </Card.Body>
    </Card>
    </Col>

    <Col lg={2} className="">
    <Card style={{ width: '11rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className="text-center">
         $18
        </Card.Text>
        <Card.Text className="text-center">
         <i>neem plant</i>
        </Card.Text>
      
        <div className="d-flex flex-row justify-content-around mt-0">
      <div className="">
      <Button variant="light" className="px-3">-</Button>
      </div>
      <div className="mt-1">
  <p>2</p>
      </div>
      <div className="">
      <Button variant="light sm">+</Button>
      
      </div>
    
    </div>

    <div className="d-flex flex-row justify-content-around ">
    <Button variant="primary" className="px-5 mt-1 " size='sm'>Buy</Button>
    
    </div>
   
      </Card.Body>
    </Card>
    </Col>

    <Col lg={2} className="">
    <Card style={{ width: '11rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className="text-center">
         $18
        </Card.Text>
        <Card.Text className="text-center">
         <i>neem plant</i>
        </Card.Text>
      
        <div className="d-flex flex-row justify-content-around mt-0">
      <div className="">
      <Button variant="light" className="px-3">-</Button>
      </div>
      <div className="mt-1">
  <p>2</p>
      </div>
      <div className="">
      <Button variant="light sm">+</Button>
      
      </div>
    
    </div>

    <div className="d-flex flex-row justify-content-around ">
    <Button variant="primary" className="px-5 mt-1 " size='sm'>Buy</Button>
    
    </div>
   
      </Card.Body>
    </Card>
    </Col>

    <Col lg={2} className="">
    <Card style={{ width: '11rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className="text-center">
         $18
        </Card.Text>
        <Card.Text className="text-center">
         <i>neem plant</i>
        </Card.Text>
      
        <div className="d-flex flex-row justify-content-around mt-0">
      <div className="">
      <Button variant="light" className="px-3">-</Button>
      </div>
      <div className="mt-1">
  <p>2</p>
      </div>
      <div className="">
      <Button variant="light sm">+</Button>
      
      </div>
    
    </div>

    <div className="d-flex flex-row justify-content-around ">
    <Button variant="primary" className="px-5 mt-1 " size='sm'>Buy</Button>
    
    </div>
   
      </Card.Body>
    </Card>
    </Col>

    


   
  
</Row>
</Container>


</Container>

   
   </>
)

}

export default Home;

