pragma solidity ^0.5.13;

contract SimpleStorage
{

struct pharmacy 
{

    address owner;
    string name;
    string password;


}
struct manufacturer 
{

    address owner;
    string name;
    string password;
  

}
struct distributer 
{

    address owner;
    string name;
    string password;


}
struct customer 
{

    address owner;
    string name;
    string password;

}
string pharmacys;
string manufacturers;
string distributers;
string customers;
string details;




mapping(address => pharmacy) public pharmacy_struct;
mapping(address => manufacturer) public manufacturer_struct;
mapping(address => distributer) public distributer_struct;
mapping(address => customer) public customer_struct;


function signup_pharmacy (address owner,string memory name,string memory password) public 

{   
    require (keccak256(abi.encodePacked(pharmacy_struct[owner].password )) != keccak256(abi.encodePacked(password)),"you are already signed up as pharmacy");
    pharmacy_struct[owner] = pharmacy(owner,name,password);

}

function pharmacy_login_validate (address ad,string memory pwd) public view returns(uint)
{
    if (keccak256(abi.encodePacked(pharmacy_struct[ad].password )) == keccak256(abi.encodePacked(pwd)))
    {
    return 1;
    }
    else
    {
        return 0;
    }
}

function signup_manufacturer (address owner,string memory name,string memory password) public 

{   
    require (keccak256(abi.encodePacked(manufacturer_struct[owner].password )) != keccak256(abi.encodePacked(password)),"you are already signed up as manufacturer");
    manufacturer_struct[owner] = manufacturer(owner,name,password);

}

function manufacturer_login_validate (address ad,string memory pwd) public view returns(uint)
{
    if (keccak256(abi.encodePacked(manufacturer_struct[ad].password )) == keccak256(abi.encodePacked(pwd)))
    {
    return 1;
    }
    else
    {
        return 0;
    }
}

function signup_distribuer (address owner,string memory name,string memory password) public 

{   
    require (keccak256(abi.encodePacked(distributer_struct[owner].password )) != keccak256(abi.encodePacked(password)),"you are already signed up as distributer");
    distributer_struct[owner] = distributer(owner,name,password);

}

function distributer_login_validate (address ad,string memory pwd) public view returns(uint)
{
    if (keccak256(abi.encodePacked(distributer_struct[ad].password )) == keccak256(abi.encodePacked(pwd)))
    {
    return 1;
    }
    else
    {
        return 0;
    }
}


function signup_customer (address owner,string memory name,string memory password) public 

{   
    require (keccak256(abi.encodePacked(customer_struct[owner].password )) != keccak256(abi.encodePacked(password)),"you are already signed up as customer");
    customer_struct[owner] = customer(owner,name,password);

}

function customer_login_validate (address ad,string memory pwd) public view returns(uint)
{
    if (keccak256(abi.encodePacked(customer_struct[ad].password )) == keccak256(abi.encodePacked(pwd)))
    {
    return 1;
    }
    else
    {
        return 0;
    }
}


function update_details (string memory data) public 
{
    details = data;

}

function view_details () public view returns(string memory)
{

    return (details);  

}
string input_data="manufacturer";
function drug_validate (string memory user_input) public view returns(uint)

{

    if (keccak256(abi.encodePacked(input_data )) == keccak256(abi.encodePacked(user_input)))
    {
    return 1;
    }
    else
    {
        return 0;
    }
}


}

