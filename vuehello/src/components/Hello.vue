<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
var stuff = {
  msg: 'loading...',
};

var counter = 0;
setInterval(() => {
  counter++;
  if (counter % 2 == 0) {
    stuff.msg = 'Hello World!';
  } else {
    stuff.msg = 'Hello Blinking World!';
  }
}, 1000);

export default {
  data () {
    return stuff;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
