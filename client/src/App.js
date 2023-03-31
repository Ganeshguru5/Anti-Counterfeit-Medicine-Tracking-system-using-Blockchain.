import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form } from 'react-bootstrap';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)


  }
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    console.log("componentDidMount");
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      console.log(web3, accounts, "hello");
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accoun        deployedNetwork && deployedNetwork.address,
        ts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    console.log("example");
    const { accounts, contract } = this.state;
    console.log(accounts, ",", contract);
    // Stores a given value, 5 by default.
    // await contract.methods.view_patient_info_by_owner(5).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.patient_login_validate("0xb692926159De1668B6f336B8253e2f5D15b6B055", "yadav").call()
    // const response = await contract.methods.signup_patients("0xb692926159De1668B6f336B8253e2f5D15b6B055","0xb692926159De1668B6f336B8253e2f5D15b6B055","yadav","yadav",26).send({from:"0xb692926159De1668B6f336B8253e2f5D15b6B055"})

    console.log(accounts[0], response)

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <>
        <div>
          <Button onClick={() => {
            localStorage.clear();
            this.props.history.replace("/")
            console.log(this.props.history)
          }

          } variant="outline-success" style={{ width: "10" }} className="position-absolute top-0 end-0" >LOG OUT</Button>
        </div>

        <div className="App">
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 5 (by default).
          </p>
          <p>
            Try changing the value stored on <strong>line 42</strong> of App.js.
          </p>
          <div>The stored value is: {this.state.storageValue}</div>
        </div>

      </>
    );
  }
}

export default App;
