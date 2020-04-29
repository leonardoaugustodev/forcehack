<template>
  <div id="app">
    <div id="header">
      <div>
        <img src="./assets/logo.png" />
      </div>
    </div>
    <div id="main">
      <div id="nav">
        <router-link tag="div" to="/">Home</router-link>
        <router-link tag="div" to="/task">Tasks</router-link>
        <router-link tag="div" to="/note">Notes</router-link>
        <router-link tag="div" to="/report">Reports</router-link>
      </div>
      <div id="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  display: flex;
  flex-direction: column;
}

#header {
  // background: #fff;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-bottom: 2px solid $light-blue;
  height: 100px;

  > div {
    width: 200px;

    img {
      height: 80px;
    }
  }
}

#main {
  background: #3ef;

  display: flex;
  flex-direction: columns;

  flex: 1;
}

#nav {
  justify-content: center;

  width: 200px;
  background: $dark-blue;

  div {
    margin: 10px 0 10px 0;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    font-size: 16px;
    color: rgb(226, 226, 226);
    text-decoration: none;

    cursor: pointer;

    &.router-link-exact-active {
      color: $light-green;
    }

    &:hover {
      background: #03324b;
      transition: 0.5s all ease;
    }
  }
}

#content {
  background: rgb(245, 245, 245);
  padding: 10px;

  flex: 1;
}
</style>
