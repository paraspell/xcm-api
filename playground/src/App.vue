<template>
  <div id="app">
    <b-navbar style="margin-bottom: 5%;">
      <template #start>
        <img style="width: 300x; height: 90px; margin-right: 5%; " src="./assets/lightSpell.png" />
        <h1 style="margin-top: 3%;" class="name first" >Playground</h1>
       
      </template>
    </b-navbar>
    <router-view/>
    <notifications/>
  </div>
</template>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Anybody:wght@300&family=BIZ+UDGothic&family=Pacifico&display=swap");

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: white;
    margin-top: 20px;
    margin-left: 15%;
    margin-right: 15%;
  }
  .mainLogo {
    width: 4%;
  }
  .rotate {
    animation: rotation 50s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  .name {
    color: #e6007a;
    font-family: "Pacifico", cursive;
    font-size: 40px;
  }
  .undername {
    color: black;
    font-family: "Anybody", cursive;
    font-size: 14px;

  }
  .undertext {
    color: black;
    font-family: "Anybody", cursive;
    font-size: 20px;
    margin-bottom: 1px;
    margin-top: 25px;
  }
  .together {
    display:block
  }
  .flex__container {
    display: flex;
    flex-direction: column;
  }
  .top {
    margin-top: 8px;
  }
</style>

