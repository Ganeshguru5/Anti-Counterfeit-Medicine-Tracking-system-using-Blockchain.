
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner,Navbar,NavDropdown,NavItem,Nav,Modal,Figure  } from 'react-bootstrap';
import logo from "./logo.png"


import "./App.css";
import { Description } from "@ethersproject/properties";

function Admin(props) {


const history = useHistory();
const [web3, setweb3] = useState(null)
const [accounts, setaccounts] = useState(null)
const [contract, setcontract] = useState(null)
const [flag, setflag] = useState(0)
const [event, setevent] = useState("login")
const [Show_add_product, setShow_add_product] = useState(false);
const [show_view_details, setShow_view_details] = useState(false);
const [error, setError] = useState();
const [txs, setTxs] = useState([]);
const [loader, setloader] = useState(true);

const [selleradd, setselleradd] = useState("")
const [eth, seteth] = useState("")
const [product_name, setproduct_name] = useState("")
const [product_id, setproduct_id] = useState("")
const [product_price, setproduct_price] = useState("")

const [product_storage, setproduct_storage] = useState("")
const [product_description, setproduct_description] = useState("")

const [current_plan_viewed, setcurrent_plan_viewed] = useState("")
const [current_user_data, setcurrent_user_data] = useState("")
const [claim, setclaim] = useState(null)

const handleShow_add_product = () => setShow_add_product(true);
const handleClose_add_product = () => setShow_add_product(false);


const handleClose_view_details = () => {setShow_view_details(false)};
const handleShow_view_details = () => setShow_view_details(true);
const [accountdetails, setaccountdetails] = useState(null)
const[user_list_array,setuser_list_array]=useState([])
const[repay_amount,setrepay_amount]=useState("")
const[plan_amount,setplan_amount]=useState("")
const[plan_name,setplan_name]=useState("")
const[description,setdescription]=useState("")
const[img1,setimg1]=useState("")
const[data,setdata]=useState([])
const[img2,setimg2]=useState("")
const [file1, setFile1] = useState(null);
const [file2, setFile2] = useState(null);
const [claim_list, setclaim_list] = useState([]);
useEffect(() => {
  console.log("use");
  initilize()
  }, [flag])

  let load_data =async(data)=>{

    try{
      let responce =await data.methods.view_details().call()
 
      let obj_responce=JSON.parse(responce)
      console.log(obj_responce);
   
         obj_responce.user_list.map((ele)=>{
           if(ele.user_address==localStorage.getItem("useraddress")){
             setcurrent_user_data(ele)
             
           }
         })
   
   setdata(obj_responce)
   setloader(false)
    }
    catch(err){
        setdata(null)
console.log(err);
    }
  }




  const initilize = (async () => {
  

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
    load_data(instance)
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

  
  async function storing_data_in_bc() {
    try{
      console.log(data);
      let responce2 =await contract.methods.update_details(JSON.stringify(data)).send({ from: accountdetails[0] })
      window.location.reload()
    }
    catch{
      window.location.reload()
    }
   
  }
 
  if (loader) {
    return (
      <div style={{marginTop:"20%"}} class="d-flex flex-column  align-items-center">
<div class="">
  <Spinner variant="primary" animation="border" role="status" >
    
       </Spinner>
    </div>
<div class="mt-1" style={{fontWeight:"550",fontFamily:"Helvetica !important"}}><h2>Loading...</h2></div>
</div>
    )



  }
return(
   <>
  
   <Container fluid>
  
   <Navbar bg="light" expand="lg">
      <Container fluid>
      <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />  &nbsp;Tento Care
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          

            <Button variant="outline-danger" className="mx-2" 
            onClick={()=>{
           localStorage.clear()
              history.push("/")
              window.location.reload()
            }}
            
            >Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
<div class="jumbotron bg-light py-3">
<h1 class="display-4 text-danger">Hello, {current_user_data.user_name}</h1>
</div>
<div>
<Button variant="outline-danger" className=" mx-1 mt-3 mb-3 "

        onClick={()=>{
          handleShow_add_product()
        }}
        >ADD PRODUCT</Button> 
</div>

<Container  className="mt-4">
<Row>
  {
data.details!=null?(
  data.details.map((data)=>(
data.created_by=="manufacturer"?(
    <Col lg={3} className="">
    <Card style={{ width: '14rem' }} className="mb-4">
      <Card.Body  className="rounded-10">
      <Card.Title className="text-center text-danger">{data.product_name}</Card.Title>
      <Card.Text className="text-center">
        {data.product_price}
        </Card.Text>
        <Card.Text className="text-center">
        {data.product_id}
        </Card.Text>
        <Card.Text className="text-center">
        {data.product_storage}
        </Card.Text>
        <Card.Text className="text-center">
        {data.product_description}
        </Card.Text>

        <div className="d-flex flex-row justify-content-around ">
        <Button variant="outline-danger" className="px-5 text-center " size='sm'
      onClick={()=>{
        var amount = prompt("Please enter amount")
           
            if (amount != null) {
              data.product_price=amount
            }
       
console.log(data.product_price);
console.log(data);
      
      storing_data_in_bc()
      setloader(true)

      }

      }
      >Edit price</Button>
      
      </div>
      </Card.Body>
    </Card>
    </Col>
):
(
    null
    )
   
        ))
)
:
(null)
  }



</Row>
</Container>

<div style={{marginTop:"50px"}}>

<Modal show={Show_add_product} onHide={handleClose_add_product} >
        <Modal.Header closeButton>
          <Modal.Title>Good to see you Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Name" value={product_name} onChange={(e)=>{
              setproduct_name(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Id" value={product_id} onChange={(e)=>{
              setproduct_id(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Price" value={product_price} onChange={(e)=>{
              setproduct_price(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Storage" value={product_storage} onChange={(e)=>{
              setproduct_storage(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Description" value={product_description} onChange={(e)=>{
              setproduct_description(e.target.value)}} />
          </Form.Group>
         
                  <Row>


</Row>
        </Modal.Body>
        <Modal.Footer>
         
        <Button variant="danger" onClick={()=>{
       
       let product_obj={
        product_name,
        product_id,
        product_price,
        product_storage,
        product_description,
        "bought_by":[],
        "created_date":moment().format("DD MM YYYY"),
        "created_time":moment().format("hh:mm:ss"),
        "created_by":localStorage.getItem("usertype"),
        "owner_id":localStorage.getItem("useraddress"),
       }
       console.log(data);
data.details.push(product_obj)
console.log(data);
storing_data_in_bc()
              }}>
              save
            </Button>
        </Modal.Footer>

</Modal>




    
</div>
     
</Container>

   
   </>
)

}

export default Admin;

