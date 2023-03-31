
  import React, { Component, useState, useEffect } from "react";
  import SimpleStorageContract from "./contracts/SimpleStorage.json";
  import getWeb3 from "./getWeb3";
  import moment from "moment";
  import "./Styles/Login.css"
  import metamask from "../src/assets/metamask.mp4"


  import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner } from 'react-bootstrap';
  import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
  import backgroundImage from "./bg.png";

  import "./App.css";

  function Login(props) {


      const [loginstate,setloginstate]= useState("login")
      const [web3, setweb3] = useState(null)
      const [accounts, setaccounts] = useState(null)
      const [contract, setcontract] = useState(null)
      const [flag, setflag] = useState(0)
      const [data,setdata] = useState(null)
      const [accountdetails, setaccountdetails] = useState(null)
      const[user_type,setuser_type]= useState("")
      const[u_name,setu_name]= useState("")
      const[adminexisst,setadminexisst]=useState(false)
      const[u_password,setu_password]= useState("")
      const[u_address,setu_address]=useState("")
      const[user_admin,setuser_admin]=useState(false)
      const[user_pharmasy,setuser_pharmacy]=useState(false)
       const[user_manufacturer,setuser_manufacturer]=useState(false)
      const[user_distributer,setuser_distributer]=useState(false)
       const[user_customer,setuser_customer]=useState(false)
      
      const[loader,setloader]=useState(false)

      useEffect(() => {
        console.log("use");
        initilize()
        }, [flag])


        
        let load_data =async(data)=>{

          try{
            let responce =await data.methods.view_details().call()
//             let array=[]
          let obj_responce=JSON.parse(responce)
                setdata(obj_responce)
            console.log(obj_responce);
//             obj_responce.map((ele)=>{
//               array.push(ele)
//               if(ele.type=="admin"){
//                 setadminexisst(true)
//               }
//             })
      
// setdata(obj_responce)
          }
          catch(err){
console.log(err);
setdata(null)
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


      let login_function = async(username, password)=>{
        try{
    //       let responce =await contract.methods.admin_login_validate(username, password).call()
    //  console.log(responce);
    //  if(responce==1){
    //   localStorage.setItem("login",responce)
    //   props.history.push("/home")
    //  }
     if(user_type=="manufacturer"){
      let responce =await contract.methods.manufacturer_login_validate(username, password).call() 
      if(responce==1){

        data.user_list.map((val)=>{
          if(val.access==true && val.user_address==username){
            localStorage.setItem("login",responce)
            localStorage.setItem("usertype","manufacturer")
            localStorage.setItem("useraddress",username)
            props.history.push("/manufacturer")
            window.location.reload()
          }
          else{
            alert("Access denied")
          }
        })

        
       } 
       else{
        alert("Invalid Useraddress or Password")
        window.location.reload()
       }
      }
      else if(user_type=="pharmacy"){
        let responce =await contract.methods.pharmacy_login_validate(username, password).call() 
        if(responce==1){
          localStorage.setItem("login",responce)
          localStorage.setItem("usertype","pharmacy")
          localStorage.setItem("useraddress",username)
          props.history.push("/pharmacy")
          window.location.reload()
         } 
         else{
        alert("Invalid Useraddress or Password")
        window.location.reload()
       }
      }
      else if(user_type=="customer"){
        let responce =await contract.methods.customer_login_validate(username, password).call()  
        if(responce==1){
          localStorage.setItem("login",responce)
          localStorage.setItem("usertype","customer")
                  localStorage.setItem("useraddress",username)
          props.history.push("/customer")
          window.location.reload()
         } 
         else{
        alert("Invalid Useraddress or Password")
        window.location.reload()
       }
      }
      else if(user_type=="distributer"){
        let responce =await contract.methods.distributer_login_validate(username, password).call()  
        if(responce==1){
          localStorage.setItem("login",responce)
          localStorage.setItem("usertype","distributer")
          localStorage.setItem("useraddress",username)
          props.history.push("/distributer")
          window.location.reload()
         } 
         else{
        alert("Invalid Useraddress or Password")
        window.location.reload()
       }  
      }
      else if(username=="admin" && password=="123"){
          localStorage.setItem("login",1)
          localStorage.setItem("usertype","admin")
          localStorage.setItem("useraddress",username)


          props.history.push("/admin")
          window.location.reload()
            
      }
     
        }catch(err){
          alert("Something Went Wrong")
  console.log(err);
        }
      

      }

      let signup_function = async(useraddress,username, password,data)=>{
        try{
if(user_type=="manufacturer"){
await contract.methods.signup_manufacturer(useraddress,username, password).send({ from: accountdetails[0] })
 
}
else if(user_type=="pharmacy"){
await contract.methods.signup_pharmacy(useraddress,username, password).send({ from: accountdetails[0] })

}
else if(user_type=="customer"){
 await contract.methods.signup_customer(useraddress,username, password).send({ from: accountdetails[0] })

}
else if(user_type=="distributer"){
  await contract.methods.signup_distribuer(useraddress,username, password).send({ from: accountdetails[0] })

}
console.log(data);
          let responce2 =await contract.methods.update_details(JSON.stringify(data)).send({ from: accountdetails[0] })
          alert("Account created successfully")
          window.location.reload()

        }catch(err){
          console.log(err);
        }
      

      }

    


  if(loader==true){
    return(
      <>
      <Spinner animation="border" variant="primary" />
      </>
    )
  }
  return (
  <div style={{
    display:'flex',flexDirection:'row'
  }}>
<div>
      <video src={metamask} autoPlay loop width='100%'/>
    </div>
  <div  >
    
      {
          loginstate=="login"? (
            
  <div >
  <div className='Logincon' >
      
        <div >
          <p className='logintext'>LOGIN</p>
          <Form>
        <div  controlId="formBasicEmail">
          {/* <Form.Label>User address</Form.Label> */}
          <input type="text" className="inputin" placeholder="Enter address" value={u_address}  onChange={(e)=>{
            setu_address(e.target.value)
        
          }}/>
        
        </div>
<br />
        <div  controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <input type="password" className="inputin" placeholder="Password" value={u_password} onChange={(e)=>{
            setu_password(e.target.value)}} />
        </div>
    
<div style={{display:'flex',flexDirection:'row',marginTop:'40px',justifyContent:'space-evenly'}}>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <input
          checked={user_customer}
         type="radio"
         label={`Customer`}
         id={`disabled-default-}`}
         onClick={()=>{setuser_admin(false)
        setuser_customer(true)
        setuser_pharmacy(false)
        setuser_manufacturer(false)
        setuser_distributer(false)
        setuser_type("customer")
       }}
       />
      <p>Customer</p>
  </div>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <input
          checked={user_pharmasy}
         type="radio"
         label={`Pharmac`}
         id={`disabled-default-}`}
         onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(true)
        setuser_manufacturer(false)
        setuser_distributer(false)
        setuser_type("pharmacy")
       }}
       />
       <p>Pharmacy</p>
  </div>
  </div>
<div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<input
       checked={user_distributer}
       type="radio"
       label={`Distributer`}
       id={`disabled-default-}`}
       onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(false)
        setuser_manufacturer(false)
        setuser_distributer(true)
        setuser_type("distributer")
       }}
     />
     <p>Distributer</p>
</div>
    
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>


<input
       checked={user_manufacturer}
       type="radio"
       label={`Manufacturer`}
       id={`disabled-default-}`}
       onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(false)
        setuser_manufacturer(true)
        setuser_distributer(false)
        setuser_type("manufacturer")
       }}
     />
     <p>Manufacturer</p>
</div>
</div>
  
   
  

        <div >
        <button  className='signinbtn'  onClick={()=>{login_function(u_address,u_password) 
        }} >
        Login
        </button>
        
      </div>
      <div >
      <button className='signinbtn' onClick={()=>{setloginstate("signup")
      setu_address("") 
      setu_name("")
      setu_password("")
      }
    
    } >New User</button>
      </div>
  
      </Form>
        
        </div>
      </div>
  </div>
          ): loginstate=="signup"?
          (
              <div >
              <div className="Logincon">
                  
                    <div style={{}}>
                      <p className='logintext'>SIGN UP</p>
                      <div>
                    <div classNdiv controlId="formBasicEmail">
                  
                      <input className="inputin" type="text" placeholder="Enter name" value={u_name}  onChange={(e)=>{
            setu_name(e.target.value)
        
          }}/>
                    
                    </div>
                    <br />
                    <div className="mb-4" controlId="formBasicEmail">
                  
                      <input className="inputin" type="text" placeholder="Enter address" value={u_address}  onChange={(e)=>{
            setu_address(e.target.value)
        
          }} />
                    
                    </div>
                    
                    <div className="mb-4" controlId="formBasicPassword">
                  
                      <input className="inputin" type="password" placeholder="Password" value={u_password} onChange={(e)=>{
            setu_password(e.target.value)
        
          }}/>
                    </div>

<div  style={{display:'flex',flexDirection:'row',marginTop:'40px',justifyContent:'space-evenly'}}>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <input
          checked={user_customer}
         type="radio"
         label={`Customer`}
         id={`disabled-default-}`}
         onClick={()=>{setuser_admin(false)
        setuser_customer(true)
        setuser_pharmacy(false)
        setuser_manufacturer(false)
        setuser_distributer(false)
        setuser_type("customer")
       }}
       />
    <p>Customer</p>
  </div>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <input
          checked={user_pharmasy}
         type="radio"
         label={`Pharmacy`}
         id={`disabled-default-}`}
         onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(true)
        setuser_manufacturer(false)
        setuser_distributer(false)
        setuser_type("pharmacy")
       }}
       />
       <p>Pharmacy</p>
  </div>
</div>
  <div style={{display:'flex',flexDirection:'row',marginTop:'40px',justifyContent:'space-evenly'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<input
       checked={user_distributer}
       type="radio"
       label={`Distributer`}
       id={`disabled-default-}`}
       onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(false)
        setuser_manufacturer(false)
        setuser_distributer(true)
        setuser_type("distributer")
       }}
     />
     <p>Distributer</p>
</div>
    
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>


<input
       checked={user_manufacturer}
       type="radio"
       label={`Manufacturer`}
       id={`disabled-default-}`}
       onClick={()=>{setuser_admin(false)
        setuser_customer(false)
        setuser_pharmacy(false)
        setuser_manufacturer(true)
        setuser_distributer(false)
        setuser_type("manufacturer")
       }}
     />
     <p>Manufacturer</p>
</div>
</div>
  

            
                
                    <div >
                    <button className='signinbtn'  variant="primary"  onClick={()=>{
                      if(data==null){
                        let initial_object={
                          "user_list":[],
                          "details":[],
                          "sold_to":[],
                        }
                        initial_object.user_list.push({
                            "user_name":u_name,
                            "user_address":u_address,
                            "user_type":user_type,
                            "access":false,
                        })
                        console.log(initial_object);
                        signup_function(u_address,u_name,u_password,initial_object)

                      }
                      else{
                        data.user_list.push({
                          "user_name":u_name,
                          "user_address":u_address,
                          "user_type":user_type,
                          "access":false,
                      })
                        console.log(data);
                        signup_function(u_address,u_name,u_password,data)

                      }

                      
                      }}>
                    Sign up
                    </button>
                    
                  </div>
                  <div >
                  <button className='signinbtn' variant="link" onClick={()=>{setloginstate("login")
      setu_address("") 
      setu_name("")
      setu_password("")
      }} >Login</button>
                  </div>
              
                  </div>
                    
                    </div>
                  </div>
              </div>
          ): loader==true?
          (
            <Spinner animation="border" variant="primary" />
          ):
          (
            null
          )
      }
    
  </div>

  </div>

  );
  }
  export default Login;

