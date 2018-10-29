const Web3      = require('web3')
const etcTx     = require('ethereumjs-tx')

// Need to change IP and port to connect server
var web3        = new Web3(new Web3.providers.HttpProvider("http://172.105.222.7:8745"));

// It's unnecessary to change these values
// var gasPrice    = web3.utils.toHex(20000000000)
var gasPrice    = web3.utils.toHex(0)
var gasLimit    = web3.utils.toHex(300000)

// Note: private key without 0x & value is in gWei (* 10^18)
var privateKey  = Buffer.from("9d7ad24bedd5289f2e81cb04c53da51e6ac2b0358396ee7234e07aef641e25eb", "hex")
var fromAddr    = "0xddf123f2cd1db38414e2b7ff0034c34e70d18198"
var toAddr      = "0x6c81b845fe834156ee1ef13859d2e6c4472b6aba"
var value       = web3.utils.toHex(10000000000000)

// console.log("Begin ...........")

var count = web3.eth.getTransactionCount(fromAddr, "pending")
.then(function(result) {
    // console.log('result: ', result)
    // console.log("Processing ...........")
    var nonce   = web3.utils.toHex(result)

    var params  = {
        nonce:      nonce,
        gasPrice:   gasPrice,
        gasLimit:   gasLimit,
        to:         toAddr,
        value:      value
    }

    console.log("params: ", params)

    var tx = new etcTx(params)
    tx.sign(privateKey)

    var serializedTx = tx.serialize()
    console.log("rawTx: ", "0x" + serializedTx.toString("hex"))
},
function(error) {
    console.log("error: ", error)
});

// console.log("End ...........")
