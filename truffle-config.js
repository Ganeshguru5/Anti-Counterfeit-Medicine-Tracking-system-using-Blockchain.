const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;


module.exports = {
// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!
contracts_build_directory: path.join(__dirname, "client/src/contracts"),
networks: {
    development: {
    port: 8545,
    network_id: "*",
    host: "127.0.0.1"
    },
    ganache_local: {
    provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex )
    },
    network_id: 1337
    },
    ropsten_infura: {
        provider: function() {
          return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/80e53815e6484243a1bee8919ee542be", MetaMaskAccountIndex)
        },
        network_id: 3,
        networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      },
},
compilers: {
    solc: {
    version: "0.5.13"
    ,
    }
}
};