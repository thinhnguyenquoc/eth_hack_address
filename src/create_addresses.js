var seed 		= 'buzz guitar noodle chief aspect glory concert jewel craft mixed bicycle butter'
const numAddrs	= 1;
const ETC 		= require('./etc.js')
const Web3      = require('web3')
var etc = new ETC()
var fs = require('fs');
const axios = require('axios');
const readLastLines = require('read-last-lines');
const Common            = require('./common.js');
var common = new Common();
// Need to change IP and port to connect server
var web3        = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/vzNvkEyCh7ynImzgkWOn"));
var web3_2        = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0BGbYJC2pHEUHcjm7nj8")); 

readLastLines.read('keys.txt', 2)
    .then((lines) => r(parseInt(lines)));

var r = (i) =>{
	if(seed &&(i ==0 || i == 1000 || i == undefined)){
		i = 0;
		var mnemonic = common.generateMnemonic();
		seed = mnemonic;
		fs.appendFile('keys.txt', 'mnemonic: ' + mnemonic  + "\n\t", function (err) {
			if (err) throw err;
			console.log('mnemonic:', mnemonic);
		});
	}
	setTimeout(function(){ 
		var addr = etc.createWalletFromSeed(seed, null, i);
		console.log('addr', addr.address);
		if(i%5==0){
			web3.eth.getBalance(addr.address).then((data)=>{
				console.log('web3_infura',data);
				if(parseFloat(data) != 0){
					fs.appendFile('keys.txt', i + " " + JSON.stringify(addr) + "\n\t", function (err) {
						if (err) {					
							r(i);
						}
						else{
							console.log(i);
							i++;
							r(i);
							console.log('Saved ok!', addr);
						}					
					});
				}
				else{
					fs.appendFile('keys.txt', i + "\n\t", function (err) {
						if (err) 
							r(i);
						else{
							console.log(i);
							i++;
							r(i);
						}
					});
				}
			});
		}
		else if(i%5==1){
			axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${addr.address}/balance`).then((data)=>{
				console.log('blockcypher',data.data.balance);
				if(parseFloat(data.data.balance) != 0){
					fs.appendFile('keys.txt', i + " " + JSON.stringify(addr) + "\n\t", function (err) {
						if (err) {					
							r(i);
						}
						else{
							console.log(i);
							i++;
							r(i);
							console.log('Saved ok!', addr);
						}					
					});
				}
				else{
					fs.appendFile('keys.txt', i + "\n\t", function (err) {
						if (err) 
							r(i);
						else{
							console.log(i);
							i++;
							r(i);
						}
					});
				}
			});
		}
		else if(i%5==2){
			web3_2.eth.getBalance(addr.address).then((data)=>{
				console.log('web3_2_infura',data);
				if(parseFloat(data) != 0){
					fs.appendFile('keys.txt', i + " " + JSON.stringify(addr) + "\n\t", function (err) {
						if (err) {					
							r(i);
						}
						else{
							console.log(i);
							i++;
							r(i);
							console.log('Saved ok!', addr);
						}					
					});
				}
				else{
					fs.appendFile('keys.txt', i + "\n\t", function (err) {
						if (err) 
							r(i);
						else{
							console.log(i);
							i++;
							r(i);
						}
					});
				}
			});
		}
		else if(i%5 == 3){
			axios.get(`http://api.ethplorer.io/getAddressInfo/${addr.address}?apiKey=freekey`).then((data)=>{
				console.log('ethplorer',data.data.ETH.balance);
				if(parseFloat(data.data.ETH.balance) != 0){
					fs.appendFile('keys.txt', i + " " + JSON.stringify(addr) + "\n\t", function (err) {
						if (err) {
							r(i);
						}
						else{
							console.log(i);
							i++;
							r(i);
							console.log('Saved ok!', addr);
						}						
					});
				}
				else{
					fs.appendFile('keys.txt', i + "\n\t", function (err) {
						if (err) 							
							r(i);
						else{
							console.log(i);
							i++;
							r(i);
						}
					});
				}
			
			})
		}
		else{
			axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${addr.address}&tag=latest&apikey=CQCV5XXZC8N8HSVH7QP9JKW6EUJYJ6GXE6`).then((data)=>{
				console.log('etherscan',data.data.result);
				if(parseFloat(data.data.result) != 0){
					fs.appendFile('keys.txt', i + " " + JSON.stringify(addr) + "\n\t", function (err) {
						if (err) {							
							r(i);
						}
						else{
							console.log(i);
							i++;
							r(i);
							console.log('Saved ok!', addr);
						}						
					});
				}
				else{
					fs.appendFile('keys.txt', i + "\n\t", function (err) {
						if (err) 						
							r(i);
						else{
							console.log(i);
							i++;
							r(i);
						}
					});
				}
			});
		}
	}, 2000);
	
}