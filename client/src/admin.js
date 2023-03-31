
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
const [checked_status, setchecked_status] = useState(null)

const [event, setevent] = useState("login")
const [show, setShow] = useState(false);
const [show_view_details, setShow_view_details] = useState(false);
const [error, setError] = useState();
const [txs, setTxs] = useState([]);
const [selleradd, setselleradd] = useState("")
const [eth, seteth] = useState("")
const [current_plan_viewed, setcurrent_plan_viewed] = useState("")
const [current_user_data, setcurrent_user_data] = useState("")
const [claim, setclaim] = useState(null)
const handleClose = () => {setShow(false)};
const handleShow = () => setShow(true);

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

useEffect(() => {
  console.log("use");
  initilize()
  }, [flag])

  let load_data =async(data)=>{

    try{
      let responce =await data.methods.view_details().call()
 
    let obj_responce=JSON.parse(responce)
            console.log(obj_responce);


    //   obj_responce.map((ele)=>{
    //     if(ele.address==localStorage.getItem("useraddress")){
    //       setcurrent_user_data(ele)
    //       console.log(ele.plans,"ele");
    //       ele.plans.map((val)=>{
    //         val.users_bought.map((data)=>{

    //         })
    //       })
    //     }
    //   })

setdata(obj_responce)

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
  <h1 class="display-4 text-danger">Hello, Admin</h1>
</div>
<div>

</div>

<Container  className="mt-4">
<Row>
  {
data.user_list!=null?(
  data.user_list.map((val)=>(
val.user_type=="manufacturer"?(
  <div style={{ marginTop: 20 }}>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Access</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{val.user_name}</td>
      <td>
      <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
      
        checked={val.access}
        onClick={()=>{
          val.access=!val.access
          setchecked_status(!val.access)
      
         }}
       
      />
    </Form>

      </td>
      <td>
      <Button variant="danger" onClick={()=>{
       
       
       console.log(data);
       storing_data_in_bc()
              }}>
              save
            </Button>

      </td>
     
    </tr>
   
  </tbody>
</table>
</div>
)
:(null)

        ))
)
:
(null)
  }



</Row>
</Container>


     
</Container>

   
   </>
)

}

export default Admin;

