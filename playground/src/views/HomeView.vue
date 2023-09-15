<template>
       <div id="app">

        <a href="https://paraspell.github.io/docs/api/g-started.html">Official documentation link (Contains useful examples)</a>

<b-field class="textt" label-position="inside" label="Select XCM API pallet you wish to test">
        <b-select expanded v-model="operation" @input.native="assignOperation($event)" placeholder="Select operation" required>
          <option v-for="(operation) in operations" :key="operation">{{operation}}</option>
        </b-select>
      </b-field>

      <b-field v-if="operation == 'Asset Query operations'" class="textt" label-position="inside" label="Select asset Query operation you wish to perform">
        <b-select expanded v-model="assetOperation" @input.native="assignAssetOperation($event)" placeholder="Select operation" required>
          <option v-for="(assetOperation) in assetOperations" :key="assetOperation">{{assetOperation}}</option>
        </b-select>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve assets object for a specific Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve asset id for particular Parachain and asset'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve asset id for particular Parachain and asset'"  class="textt" label-position="inside" label="Provide asset symbol (Eg. KSM or DOT)">
        <b-input expanded @input.native="symbolAssign($event)" v-model="symbol"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve the Relay chain asset Symbol for a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve native assets for a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve foreign assets for a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve all asset symbols for particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve support for a particular asset on a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve support for a particular asset on a particular Parachain'"  class="textt" label-position="inside" label="Provide asset symbol (Eg. KSM or DOT)">
        <b-input expanded @input.native="symbolAssign($event)" v-model="symbol"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve decimals for a particular asset for a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve decimals for a particular asset for a particular Parachain'"  class="textt" label-position="inside" label="Provide asset symbol (Eg. KSM or DOT)">
        <b-input expanded @input.native="symbolAssign($event)" v-model="symbol"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve Parachain id for a particular Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="assetOperation == 'Retrieve Parachain name from Parachain ID'"  class="textt" label-position="inside" label="Provide Parachain ID (Eg. try 2090 or 2000) (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="operation == 'XCM Pallet Query operations'" class="textt" label-position="inside" label="Select XCM Pallet Query operation you wish to perform">
        <b-select expanded v-model="palletXCMOperation" @input.native="assignXCMPalletOperation($event)" placeholder="Select operation" required>
          <option v-for="(palletXCMOperation) in palletXCMOperations" :key="palletXCMOperation">{{palletXCMOperation}}</option>
        </b-select>
      </b-field>

      <b-field v-if="palletXCMOperation == 'Return default pallet for specific Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="palletXCMOperation == 'Return an array of supported pallets for specific Parachain'"  class="textt" label-position="inside" label="Provide Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="operation == 'HRMP Pallet operations'" class="textt" label-position="inside" label="Select HRMP Pallet operation you wish to perform">
        <b-select expanded v-model="hrmpPalletOperation" @input.native="assignHRMPOperation($event)" placeholder="Select operation" required>
          <option v-for="(hrmpPalletOperation) in hrmpPalletOperations" :key="hrmpPalletOperation">{{hrmpPalletOperation}}</option>
        </b-select>
      </b-field>

      <b-field v-if="hrmpPalletOperation == 'Construct HRMP call to open channels'"  class="textt" label-position="inside" label="Provide Origin Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="hrmpPalletOperation == 'Construct HRMP call to open channels'"  class="textt" label-position="inside" label="Provide Destination Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign2($event)" v-model="node2"></b-input>
      </b-field>

      <b-field v-if="hrmpPalletOperation == 'Construct HRMP call to close channels'"  class="textt" label-position="inside" label="Provide Origin Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="operation == 'Generate XCM Message'" class="textt" label-position="inside" label="Select XCM Message scenario you wish to perform">
        <b-select expanded v-model="xcmMessageScenario" @input.native="assignXCMOperation($event)" placeholder="Select operation" required>
          <option v-for="(xcmMessageScenario) in xcmMessageScenarios" :key="xcmMessageScenario">{{xcmMessageScenario}}</option>
        </b-select>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide Origin Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide Destination Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign2($event)" v-model="node2"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide asset symbol (Eg. KSM or DOT)">
        <b-input expanded @input.native="symbolAssign($event)" v-model="symbol"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide amount your call should transfer.">
        <b-input expanded @input.native="amountAssign($event)" v-model="amount"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide destination wallet address eg. 5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96 ">
        <b-input expanded @input.native="addrAssign($event)" v-model="address"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Relay chain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide Destination Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign2($event)" v-model="node2"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Relay chain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide amount your call should transfer.">
        <b-input expanded @input.native="amountAssign($event)" v-model="amount"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Relay chain to Parachain XCM Call'"  class="textt" label-position="inside" label="Provide destination wallet address eg. 5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96 ">
        <b-input expanded @input.native="addrAssign($event)" v-model="address"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Relay chain XCM Call'"  class="textt" label-position="inside" label="Provide Origin Parachain name (Unsure of supported Parachains? Head over to our docs.)">
        <b-input expanded @input.native="nodeAssign($event)" v-model="node"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Relay chain XCM Call'"  class="textt" label-position="inside" label="Provide amount your call should transfer.">
        <b-input expanded @input.native="amountAssign($event)" v-model="amount"></b-input>
      </b-field>

      <b-field v-if="xcmMessageScenario == 'Parachain to Relay chain XCM Call'"  class="textt" label-position="inside" label="Provide destination wallet address eg. 5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96 ">
        <b-input expanded @input.native="addrAssign($event)" v-model="address"></b-input>
      </b-field>

      <b-field v-if="operation == 'API KEY testing'"  class="textt" label-position="inside" label="Provide your API key (OPTIONAL).">
        <b-input expanded @input.native="apiKeySet($event)" v-model="apikey"></b-input>
      </b-field>

      <b-button v-if="operation!='API KEY testing'" class="buttonn" expanded type="is-primary" @click="generateResponse()">Generate API response</b-button>
      <b-button v-if="operation=='API KEY testing'" class="buttonn" expanded type="is-primary" @click="generateResponse()">Test API request limit</b-button>
      <h1 v-if="data != ''" class="name">Your generated response is</h1>
      <pre v-if="data != ''" style="text-align: left">{{ data }}</pre>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api'

    export default defineComponent({

      data() {
        return {
            data: "" as any,
            node: "" as string,
            node2: "" as string,
            amount: "" as string,
            address: "" as string,
            symbol: "" as string,
            operation: "" as string,   
            operations: [] as Array<string>, 
            assetOperation: "" as string, 
            assetOperations: [] as Array<string>,
            palletXCMOperation: "" as string,
            palletXCMOperations: [] as Array<string>,
            xcmMessageScenario: "" as string,
            xcmMessageScenarios: [] as Array<string>,
            hrmpPalletOperation: "" as string,
            hrmpPalletOperations: [] as Array<string>,
            apikey: "" as string,
            
          };
        },
  
      mounted: async function () {

        this.operations.push("Generate XCM Message")
        this.operations.push("Asset Query operations")
        this.operations.push("XCM Pallet Query operations")
        this.operations.push("HRMP Pallet operations")
        this.operations.push("API KEY testing")

        this.assetOperations.push("Retrieve assets object for a specific Parachain")
        this.assetOperations.push("Retrieve asset id for particular Parachain and asset")
        this.assetOperations.push("Retrieve the Relay chain asset Symbol for a particular Parachain")
        this.assetOperations.push("Retrieve native assets for a particular Parachain")
        this.assetOperations.push("Retrieve foreign assets for a particular Parachain")
        this.assetOperations.push("Retrieve all asset symbols for particular Parachain")
        this.assetOperations.push("Retrieve support for a particular asset on a particular Parachain")
        this.assetOperations.push("Retrieve decimals for a particular asset for a particular Parachain")
        this.assetOperations.push("Retrieve Parachain id for a particular Parachain")
        this.assetOperations.push("Retrieve Parachain name from Parachain ID")
        this.assetOperations.push("Retrieve list of implemented Parachains")

        this.xcmMessageScenarios.push("Parachain to Parachain XCM Call")
        this.xcmMessageScenarios.push("Parachain to Relay chain XCM Call")
        this.xcmMessageScenarios.push("Relay chain to Parachain XCM Call")

        this.hrmpPalletOperations.push("Construct HRMP call to open channels")
        this.hrmpPalletOperations.push("Construct HRMP call to close channels")

        this.palletXCMOperations.push("Return default pallet for specific Parachain")
        this.palletXCMOperations.push("Return an array of supported pallets for specific Parachain")

      },
      methods: {
  
        async assignOperation(value: any){
            this.xcmMessageScenario = ""
            this.hrmpPalletOperation = ""
            this.palletXCMOperation = ""
            this.assetOperation = ""
            this.operation=value.target.value
        },
        async assignAssetOperation(value: any){
            this.xcmMessageScenario = ""
            this.hrmpPalletOperation = ""
            this.palletXCMOperation = ""
            this.assetOperation=value.target.value
        },
        async assignHRMPOperation(value: any){
            this.xcmMessageScenario = ""
            this.assetOperation = ""
            this.palletXCMOperation = ""
            this.hrmpPalletOperation=value.target.value
        },
        async assignXCMOperation(value: any){
            this.hrmpPalletOperation = ""
            this.assetOperation = ""
            this.palletXCMOperation = ""
            this.xcmMessageScenario=value.target.value
        },
        async assignXCMPalletOperation(value: any){
            this.xcmMessageScenario = ""
            this.assetOperation = ""
            this.hrmpPalletOperation = ""
            this.palletXCMOperation=value.target.value
        },
        async nodeAssign(value: any){
            this.node=value.target.value
        },
        async nodeAssign2(value: any){
            this.node2=value.target.value
        },
        async symbolAssign(value: any){
            this.symbol=value.target.value
        },
        async addrAssign(value: any){
            this.address=value.target.value
        },
        async amountAssign(value: any){
            this.amount=value.target.value
        },
        async apiKeySet(value: any){
            this.apikey=value.target.value
        },

        async generateResponse(){
            if(this.operation == "Asset Query operations"){
                if(this.assetOperation == "Retrieve assets object for a specific Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node);
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve asset id for particular Parachain and asset"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/id?symbol=" + this.symbol);
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve the Relay chain asset Symbol for a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/relay-chain-symbol");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve native assets for a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/native");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve foreign assets for a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/other");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve all asset symbols for particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/all-symbols");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve support for a particular asset on a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/has-support?symbol=" + this.symbol);
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve decimals for a particular asset for a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/decimals?symbol=" + this.symbol);
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve Parachain id for a particular Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node + "/para-id");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve Parachain name from Parachain ID"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node);
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
                if(this.assetOperation == "Retrieve list of implemented Parachains"){
                    let response = await fetch("http://localhost:3001/assets/");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
            }

            if(this.operation == "XCM Pallet Query operations"){
              if(this.palletXCMOperation == "Return default pallet for specific Parachain"){
                    let response = await fetch("http://localhost:3001/pallets/" + this.node + "/default");
                    this.data = JSON.stringify(await response.json(), null, 4);                    
                }
              if(this.palletXCMOperation == "Return an array of supported pallets for specific Parachain"){
                  let response = await fetch("http://localhost:3001/pallets/" + this.node);
                  this.data = JSON.stringify(await response.json(), null, 4);                    
              }
            }

            if(this.operation == "HRMP Pallet operations"){
              if(this.hrmpPalletOperation == "Construct HRMP call to open channels"){
                  let response = await fetch("http://localhost:3001/hrmp/channels?" + new URLSearchParams({from: this.node, to: this.node2, maxSize:"8", maxMessageSize:"1024"}),{ method: "POST" });
                  this.data = JSON.stringify(await response.json(), null, 4);                    
                }
              if(this.hrmpPalletOperation == "Construct HRMP call to close channels"){
                  let response = await fetch("http://localhost:3001/hrmp/channels?" + new URLSearchParams({from: this.node, inbound: "0", outbound: "0"}),{ method: "DELETE" });
                  this.data = JSON.stringify(await response.json(), null, 4);                    
              }
            }

            if(this.operation == "Generate XCM Message"){
              if(this.xcmMessageScenario == "Parachain to Parachain XCM Call"){
                  let response = await fetch("http://localhost:3001/x-transfer?" + new URLSearchParams({from: this.node, to: this.node2, currency: this.symbol, amount: this.amount, address: this.address}));
                  this.data = JSON.stringify(await response.json(), null, 4);                    
                }
              if(this.xcmMessageScenario == "Parachain to Relay chain XCM Call"){
                  let response = await fetch("http://localhost:3001/x-transfer?" + new URLSearchParams({from: this.node, amount: this.amount, address: this.address}));
                  this.data = JSON.stringify(await response.json(), null, 4);                    
              }
              if(this.xcmMessageScenario == "Relay chain to Parachain XCM Call"){
                  let response = await fetch("http://localhost:3001/x-transfer?" + new URLSearchParams({to: this.node2, amount: this.amount, address: this.address}));
                  this.data = JSON.stringify(await response.json(), null, 4);                    
              }
            }

            if(this.operation == "API KEY testing"){
              let counter = 1

              while(counter){

                if (this.apikey != "")
                {
                  let response = await fetch("http://localhost:3001/assets/Basilisk/id?symbol=KSM", { headers: new Headers({ 'X-API-KEY': this.apikey }) });
                  this.data = JSON.stringify(await response.json(), null, 4);

                  if(this.data!="1"){
                    break;
                  }

                  this.data = "Request number" + counter + this.data;

                  counter++;  
                }
                else{
                  let response = await fetch("http://localhost:3001/assets/Basilisk/id?symbol=KSM");
                  this.data = JSON.stringify(await response.json(), null, 4);

                  if(this.data!="1"){
                    break;
                  }

                  this.data = "Request number" + counter + this.data;

                  counter++;  
                }

              }
              this.data = "API made " + counter + " requests before throttler kicked in."
            }

        }
        }
    })
</script>

<style>

.name {
    color: #e6007a;
    font-family: "Pacifico", cursive;
    font-size: 40px;
  }
  
</style>