
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
const [loader, setloader] = useState(true);
const [Show_add_product, setShow_add_product] = useState(false);
const [show_view_details, setShow_view_details] = useState(false);
const [error, setError] = useState();
const [txs, setTxs] = useState([]);
const [selleradd, setselleradd] = useState("")
const [eth, seteth] = useState("")
const [product_name, setproduct_name] = useState("")
const [product_id, setproduct_id] = useState("")
const [product_price, setproduct_price] = useState("")
const [verify_id, setverify_id] = useState("")


const [product_storage, setproduct_storage] = useState("")
const [product_description, setproduct_description] = useState("")

const [current_plan_viewed, setcurrent_plan_viewed] = useState("")
const [current_user_data, setcurrent_user_data] = useState("")
const [claim, setclaim] = useState(null)

const handleShow_add_product = () => setShow_add_product(true);
const handleClose_add_product = () => setShow_add_product(false);

const [instance,setinstance] = useState(null)

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
    setinstance(instance)
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

    const purchase = async (e,a) => {
      console.log(e, a);
    
    
      setError("");
      await startPayment({
        setError,
        setTxs,
        ether: e,
        addr: a
      });
    };

const startPayment = async ({ setError, setTxs, ether, addr }) => {

try {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  ethers.utils.getAddress(addr);
  console.log({ ether, addr });
  const tx = await signer.sendTransaction({
    to: addr,
    value: ethers.utils.parseEther(ether)
  });

  console.log("tx", tx);
  setTxs([tx]);
  
  await storing_data_in_bc(data) 

  alert("Paid successfully")
} catch (err) {
  setError(err.message);
  window.location.reload()
}
};
  
async function smartcontract_call(datas) {
  console.log(datas);
  try{      
console.log(typeof(datas))
        let valid =await instance.methods.drug_validate(datas).call()
        if(valid==1){
          alert("valid product")
        }
        else{
          alert("Defective product")
        }
  }
  catch(err){
    console.log(err);
    // window.location.reload()
  }
 
}


 function verify() {
  try{
    console.log(verify_id);
    data.details.map((val)=>{
      if(val.product_id==verify_id){
        smartcontract_call(val.created_by)
      }
    })
  
  }
  catch(err){
console.log(err);
    // window.location.reload()
  }
 
}


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
   
<div class="jumbotron bg-light py-3 d-flex flex-row justify-content-between">
  <div>
  <h1 class="display-4 text-danger">Hello, {current_user_data.user_name}</h1>
  </div>
  <div>
 
  <Form.Group className="mb-4" controlId="formBasicPassword" >
            <Form.Control type="text" placeholder="Product Id" value={verify_id} onChange={(e)=>{
              setverify_id(e.target.value)}} />
                <Button variant="outline-danger" className=" text-center mt-1" size='sm'
      onClick={()=>{
verify()
      }

      }
      >Verify</Button>
          </Form.Group>
        
  </div>
 
</div>
<div>

</div>

<Container  className="mt-4">
<Row>
  {
data.details!=null?(
  data.details.map((value)=>(
value.created_by=="pharmacy"?(  
<Col lg={3} className="">
    <Card style={{ width: '14rem' }} className="mb-4">
      <Card.Body  className="rounded-10">
      <Card.Title className="text-center text-danger">{value.product_name}</Card.Title>
      <Card.Text className="text-center">
        {value.product_price}
        </Card.Text>
        <Card.Text className="text-center">
        {value.product_storage}
        </Card.Text>
        <Card.Text className="text-center">
        {value.product_description}
        </Card.Text>
        <Card.Text className="text-center">
        {value.product_id}
        </Card.Text>
        <div className="d-flex flex-row justify-content-around ">
      <Button variant="outline-danger" className="px-5 text-center " size='sm'
      // disabled={user_data.balance<=0 || data.price>user_data.balance }
      onClick={()=>{
        setloader(true)

console.log(value);
      data.sold_to.push({
        "bought_date":moment().format("DD MM YYYY"),
        "bought_time":moment().format("hh:mm:ss"),
        "brought_from":value.created_by,
        "brought_from_address":value.owner_id,
        "bought_by":current_user_data.user_type,
        "bought_by_address":current_user_data.user_address,
        "product_details":value

      })  
      console.log(data);
      purchase(value.product_price,value.owner_id) 
      }

      }
      >BUY</Button>
      
      </div>
      </Card.Body>
    </Card>
    </Col>)
:(null)
  

   
        ))
)
:
(null)
  }
  </Row>
<Row>
{
data.sold_to!=null?(
  data.sold_to.map((val)=>(

    val.bought_by=="pharmacy"?
    (
      <Col lg={3} className="">
    <Card style={{ width: '14rem' }} className="mb-4">
      <Card.Body  className="rounded-10">
      <Card.Title className="text-center text-danger">{val.product_details.product_name}</Card.Title>
      <Card.Text className="text-center">
        {val.product_details.product_price}
        </Card.Text>
        <Card.Text className="text-center">
        {val.product_details.product_storage}
        </Card.Text>
        <Card.Text className="text-center">
        {val.product_details.product_description}
        </Card.Text>
        <Card.Text className="text-center">
        {val.product_details.product_id}
        </Card.Text>
        <div className="d-flex flex-row justify-content-around ">
     
        <Button variant="outline-danger" className="px-5 text-center " size='sm'
      // disabled={user_data.balance<=0 || data.price>user_data.balance }
      onClick={()=>{
        setloader(true)


      data.sold_to.push({
        "bought_date":moment().format("DD MM YYYY"),
        "bought_time":moment().format("hh:mm:ss"),
        "brought_from":val.bought_by,
        "brought_from_address":val.bought_by_address,
        "bought_by":current_user_data.user_type,
        "bought_by_address":current_user_data.user_address,
        "product_details":val.product_details


      })  
      console.log(data);
      storing_data_in_bc()
      }

      }
      >BUY</Button>
      </div>
      </Card.Body>
    </Card>
    </Col>
    )
    :(null)


    ))
)
:(null)


  }
</Row>
<Row>

<h6 class="display-6 text-danger text-center mb-4">Products Purchased</h6>
{

data.sold_to!=null?(
  data.sold_to.map((val)=>(

    val.bought_by_address==localStorage.getItem("useraddress")?
    (
      <Col lg={3} className="">
    <Card style={{ width: '14rem' }} className="mb-4">
      <Card.Body  className="rounded-10">
      <Card.Title className="text-center text-danger">{val.product_details.product_name}</Card.Title>
      <Card.Text className="text-center">
        {val.product_details.product_price}
        </Card.Text>
        <Card.Text className="text-center">
        {val.product_details.product_storage}
        </Card.Text>
        <Card.Text className="text-center">
        {val.product_details.product_description}
        </Card.Text>
        <div className="d-flex flex-row justify-content-around ">
     
      
      </div>
      </Card.Body>
    </Card>
    </Col>
    )
    :(null)


    ))
)
:(null)


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


{/* <Modal show={show_view_details} onHide={handleClose_view_details}>
        <Modal.Header closeButton>
          <Modal.Title>Good to see you Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
          {
            console.log(current_plan_viewed,'cp')
          }
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="plan name" value={current_plan_viewed.name} onChange={(e)=>{
              setplan_name(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="plan amount" value={plan_amount} onChange={(e)=>{
              setplan_amount(e.target.value)}} />

                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="plan description" value={description} onChange={(e)=>{
              setdescription(e.target.value)}} />
          </Form.Group>
                  <Row>
  <Col>
 
<Figure class="mt-3 text-center">
<Figure.Image
          width={300}
          height={300}
          alt="171x180"
          src={img1}
          style={{borderRadius:"8%"}}
          />
      </Figure>
  </Col>

</Row>
        </Modal.Body>
        <Modal.Footer>
         
        <Button variant="danger" onClick={()=>{
       
       let plan_obj={
        plan_name,
        plan_amount,
        "image_url":img1,
        "users_bought":[],
        "created_date":moment().format("DD MM YYYY"),
        "created_time":moment().format("hh:mm:ss"),
         description, 
        "admin_id":current_user_data.address
       }
current_user_data.plans.push(plan_obj)

storing_data_in_bc()
              }}>
              save
            </Button>
        </Modal.Footer>

</Modal> */}

    
</div>
     
</Container>

   
   </>
)

}

export default Admin;

