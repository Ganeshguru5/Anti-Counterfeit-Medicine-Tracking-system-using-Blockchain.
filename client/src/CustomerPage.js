
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner,Navbar,NavDropdown,NavItem,Nav,Modal,Figure  } from 'react-bootstrap';
import logo from "./logo.png"
import doctor from './assets/doctor.png'
import List from "./Components/List";

import "./Styles/CustomerPage.css"

export default function CustomerPage() {
    
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
const [purchasedView,setpurchasedView] = useState("none");
const [productview, setproductview] = useState("flex")


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
  return (
    <div className="CustomerCon">   
        <div className="CusNav">
            <div className="CusNav1">
                <p className="title">DappSource</p>
            </div>
            <div className="CusNav2">
                <p className="username">{current_user_data.user_name}</p>
                <button variant="outline-danger" className="mx-2" 
            onClick={()=>{
           localStorage.clear()
              history.push("/")
              window.location.reload()
            }}
            
            >Logout</button>
            </div>
        </div>
        <div className="Checker">
            <div className="checkerone">
                <img src={doctor} width='200px' />
                <p className="print">Please the drug id printed on your medicine</p>
            </div>
            <div className="checkertwo">
                <input placeholder="Enter the id of the drug" value={verify_id} onChange={(e)=>{
              setverify_id(e.target.value)}} className="idin"/>
                <button className="checkbtn" onClick={()=>{verify()}}>Validate the drug</button>
            </div>
        </div>

        <div className="Enterboxes">
            <div className="box">
                <p style={{color:'white',fontWeight:'500',padding:'5px'}} onClick={()=>{setproductview('flex');setpurchasedView('none')}}>Product listed</p>
            </div>
            <div className="box">
                <p style={{color:'white',fontWeight:'500',padding:'5px'}}onClick={()=>{setpurchasedView('flex');setproductview('none');}}>Product purchased</p>
            </div>
        </div>


        <div className="productlisted">
            {
                data.details.map((value,i)=>{
                    return (<div className='listcon' style={{display:productview}}>
                    <p style={{marginLeft:'30px'}}>{value.product_name}</p>
                    <p>{value.product_id}</p>
                    <p>Rs {value.product_price}eth/per</p>
                    <p>{value.product_storage}</p>
                    <button
                    className='buybtn'
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
                    >Buy</button>
                </div>)
                })
            }
            
        </div>
            <br/>
        <div className="productpurchased" >
            {
                data.sold_to.map((value,i)=>{
                    return <div className='listcon' style={{display:purchasedView}}>
                    <p style={{marginLeft:'30px'}}>{value.product_details.product_name}</p>
                    <p>{value.product_details.product_id}</p>
                    <p>Rs {value.product_details.product_price}eth/per</p>
                    <p style={{marginRight:'30px'}}>{value.product_details.product_storage}</p>
                    
                </div>
                })

            }
            
        </div>

    </div>

  )
}
