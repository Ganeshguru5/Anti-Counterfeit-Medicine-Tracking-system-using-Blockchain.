import React,{useState,useEffect} from 'react'
import Nav from './Components/Nav'
import "./Styles/Profile.css"
import video from './assets/ethprof.mp4'
  import SimpleStorageContract from "./contracts/SimpleStorage.json";
  import getWeb3 from "./getWeb3";
import metamask from './assets/metamask.mp4'
import smartcon from './assets/smartcontract.mp4'
import ethereum from './assets/ethereum.mp4'

export default function Profile() {
  
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

  return (
    <div className='ProfileCon'>
        <Nav />
        <div className='Detailcon'>
          <div className='detailone'>
              <video src={video} type="video/mp4" loop autoPlay width='80%' />
          </div>
          <div className='detailtwo'>
            <p className='titilepropon'>Sync your medicines and funds in one app </p>
            <p className='titilepropondes'>Connect your dapps and trading accounts to get the oversight on all of your crypto investments</p>
            <div > 

            </div>
          </div>
        </div>
      <div style={{display:"flex",flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:'10%'}}>
        <hr style={{width:'30%'}}/>
        <p style={{width:"40%",fontSize:'19px',display:'flex',justifyContent:'center'}}>Explore our integrations in our project</p>
        <hr style={{width:'30%'}}/>
      </div>
        <div className='ExploreCon'>
            <div className='Explore1'>
              <div style={{width:'60%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                  <p className='feature1'> We have integrated Ethereum into our project for decentralized and secure transactions</p>
                  <p className='feature2'>Connect your dapps and trading accounts to get the oversight on all of your crypto investments</p>
              </div>
              <div style={{width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <video src={ethereum} autoPlay loop  className='expvideo'/>
              </div>
            </div>

            <div className='Explore2'>
              <div style={{width:'60%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                  <p className='feature1'> Integrating smart contracts into our project ensures secure and automated execution of predefined business rules</p>
                  <p className='feature2'>Connect your dapps and trading accounts to get the oversight on all of your crypto investments</p>
              </div>
              <div style={{width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <video src={smartcon} autoPlay loop  className='expvideo'/>
              </div>
            </div>

            <div className='Explore1'>
              <div style={{width:'60%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                  <p className='feature1'> Integrates with Metamask, providing seamless access to decentralized finance (DeFi) and other blockchain-based features</p>
                  <p className='feature2'>Connect your dapps and trading accounts to get the oversight on all of your crypto investments</p>
              </div>
              <div style={{width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <video src={metamask} autoPlay loop  className='expvideo'/>
              </div>
            </div>
            
          </div>
    </div>
  )
}
