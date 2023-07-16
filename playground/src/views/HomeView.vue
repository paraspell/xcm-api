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

      <b-button class="buttonn" expanded type="is-primary" @click="generateResponse()">Generate API response</b-button>
      <h1 v-if="data != ''" class="text">Your generated call is</h1>
      <p v-if="data != ''" class="text">{{data}}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api'

    export default defineComponent({

      data() {
        return {
            data: "" as any,
            node: "" as string,
            symbol: "" as string,
            operation: "" as string,   
            assetOperation: "" as string,
            operations: [] as Array<string>,  
            assetOperations: [] as Array<string>,
          };
        },
  
      mounted: async function () {

        this.operations.push("Generate XCM Message")
        this.operations.push("Asset Query operations")
        this.operations.push("XCM Pallet Query operations")
        this.operations.push("HRMP Pallet operations")

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


      },
      methods: {
  
        async assignOperation(value: any){
            this.operation=value.target.value
        },
        async assignAssetOperation(value: any){
            this.assetOperation=value.target.value
        },
        async nodeAssign(value: any){
            this.node=value.target.value
        },
        async symbolAssign(value: any){
            this.node=value.target.value
        },

        async generateResponse(){
            if(this.operation == "Asset Query operations"){
                if(this.assetOperation == "Retrieve assets object for a specific Parachain"){
                    let response = await fetch("http://localhost:3001/assets/" + this.node);
                     this.data = JSON.stringify(response.json(), null, 4)
                    
                }
            }
        }
        }
    })
</script>