
import React,{} from "react"
import { BrowserRouter,Redirect,Route,Switch,Component } from "react-router-dom"
import Login from "./login"
import Manufacturer from "./manufacturer"
import Admin from "./admin"
import Pharmacy from "./pharmacy"
import Customer from "./customer"
import Distributer from "./distributer"
import Profile from "./Profile"
import CustomerPage from "./CustomerPage"
import ManfufacturerPage from "./ManfufacturerPage"

function Routes(props){


    return(
        <BrowserRouter>
        <Switch>
        <Route path='/' exact component={Profile}/>
        <Route path="/Login" exact component={Login}/>
        <Route 
        
           render={() => (
            localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="customer" ?
              (
            
                <CustomerPage props  />
              
              ):  localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="admin" ?
              (
             
                <Admin props  /> 
               
              ):  localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="manufacturer" ?
              (
             
                <ManfufacturerPage props  /> 
               
              ): localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="pharmacy" ?
              (
             
                <Pharmacy props  /> 
               
              ):
              localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="distributer" ?
              (
             
                <Distributer props  /> 
               
              ):
              
              (
                <Redirect to='/Login' />
              )

    )}
        />
         <Route 
        
     
     />
        </Switch>
      
        
        </BrowserRouter>
    )

}
export default Routes