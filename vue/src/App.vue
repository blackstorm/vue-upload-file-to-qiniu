<template>
  <div id="app">
    <Uploader/>
  </div>
</template>

<script>
import Uploader from './components/Uploader';

export default {
  name: 'app',
  components: {
    Uploader,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
