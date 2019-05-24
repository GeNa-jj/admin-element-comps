<template>
  <div id="app">
    <DrawDialog></DrawDialog>
  </div>
</template>

<script>
  import DrawDialog from './components/drawDialog'
  export default {
    components: {
      DrawDialog
    }
  }
</script>

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
