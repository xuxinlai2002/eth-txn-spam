
const fs = require('fs');
const { Web3 } = require('web3');

// let rpcUrl = "https://arb.nirvanalabs.xyz/arbmain-t88g3?apikey=ee9895eb7c874f9652ce5c22f96670ff899c"
let rpcUrl = "https://arbitrum.blockpi.network/v1/rpc/49bb93bdb999e4b849bd0b52794671c145aa3a9b"
let contractABI =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum IOptionFacet.OrderType",
        "name": "_orderType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "_orderID",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_writer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_holder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_premiumAsset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "OptionPremiun",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "diamond",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_diamond",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "optionService",
    "outputs": [
      {
        "internalType": "contract IOptionService",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IOptionService",
        "name": "_optionService",
        "type": "address"
      }
    ],
    "name": "setOptionService",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "enum IOptionFacet.OrderType",
            "name": "orderType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "writer",
            "type": "address"
          },
          {
            "internalType": "enum IOptionFacet.UnderlyingAssetType",
            "name": "lockAssetType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "holder",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "lockAsset",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "underlyingAsset",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "underlyingNftID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lockAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "strikeAsset",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "strikeAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "enum IOptionFacet.LiquidateMode",
            "name": "liquidateMode",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "expirationDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lockDate",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "premiumAsset",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "premiumFee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOptionModule.SubmitJvaultOrder",
        "name": "_info",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "_holderSignature",
        "type": "bytes"
      }
    ],
    "name": "submitJvaultOrderSingle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
const contractAddress = '0xCFE9340CF648Ff7623e6c7B1C7fE2f902F390612'; // 合约地址
const eventTopic = '0xe228db4ed81956befa9c20e28cd5314ec23ca7e42b1a6ea21d6d73712f4065d1'; // event topic
// const fromBlock =  235169217
const from =  240727247
const to =    240739772
const runBlockNum = 1000;
// https://arbitrum.blockpi.network/v1/rpc/49bb93bdb999e4b849bd0b52794671c145aa3a9b

// let rpcUrl = " https://arbitrum.blockpi.network/v1/rpc/49bb93bdb999e4b849bd0b52794671c145aa3a9b"
async function main() {

  const web3 = new Web3(rpcUrl);
  let result = [];

  console.log("rpcUrl    is : ",rpcUrl);
  console.log("fromBlock is : ",from);
  console.log("runBlockNum is : ",runBlockNum);

  let detailResult = [];
  let errorTime = 0;
  let noDataTime = 0;
  let noDataTotalTime = 0;
  let getDataTime = 0;
  let getDataTotalTime = 0;

  for(var i = 0 ;i < runBlockNum ;i ++ ){

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const startTime = Date.now();
    let eachInfo;
    let cur =  from + i;
    try{
        result = await contract.getPastEvents('OptionPremiun', {
          topics: [eventTopic],
          fromBlock: cur,
          toBlock:   cur
        });
    }catch(e){
        eachInfo = "type:0" + " blockNumer:" + cur ;
        console.log("xxl error : ",cur,e);
        detailResult.push(eachInfo);
        errorTime ++ ;
        continue;
    }

    const endTime = Date.now();
    const runtime = endTime - startTime;

    console.log("xxl reuslt is : ",result);
    if(result.length == 0){
      console.log("xxl no data  : ",runtime,cur);
      eachInfo = "type:1" + " blockNumer:" + cur + " runTime:" + runtime;
      detailResult.push(eachInfo);
    
      noDataTime ++ ;
      noDataTotalTime += runtime;

    }else{
      console.log("xxl get data  : ",runtime,cur);
      eachInfo = "type:2" + " blockNumer:" + cur + " runTime:" + runtime;
      detailResult.push(eachInfo);
      
      getDataTime ++ ;
      getDataTotalTime += runtime;
    }
    result = [];
    
  }
  
  fs.writeFileSync('detail.txt', detailResult.join('\n')); 
    
  let sumResult = [];
  sumResult.push("rpcUrl : " + rpcUrl);

  let errorSum = "error number is : " + errorTime
  sumResult.push(errorSum);

  
  let noDataSum = "no data number is : " + noDataTime
  sumResult.push(noDataSum);
  if(noDataTime > 0){
    let noDataArgTime = noDataTotalTime / noDataTime
    let noDataArg = "no data average time is : " + noDataArgTime
    sumResult.push(noDataArg);
  }

  let getDataSum = "get data number is : " + getDataTime
  sumResult.push(getDataSum);

  if(getDataTime > 0){
    let getDataArgTime = getDataTotalTime / getDataTime
    let getDataArg = "get data average time is : " + getDataArgTime
    sumResult.push(getDataArg);
  }

  fs.writeFileSync('sum.txt', sumResult.join('\n')); 

  console.log("finish !!!");


}


main()
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));
