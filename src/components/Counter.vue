<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 5,
      validator(value){
        return value >= 0
      }
    }
  },
  name: 'Counter',
  data(){
    return{
      counter: this.start
    }
  },
  methods: {
    getSquareValue(){
      return this.counter * this.counter
    },
    increase(){
      this.counter++
    },
    decrease(){
      this.counter--
    }
  },
  computed: {
    squareCounter(){
      return this.counter * this.counter
    },
    customTitle(){
      return this.title || 'Counter'
    }
  }
}
</script>

<template>
  <h2>{{ customTitle }}</h2>
  <p>{{counter}} <sup>2</sup> = {{ squareCounter }}</p>
  <p data-test-id="counter">{{counter}}</p>
  <div>
    <button v-on:click="increase">+ 1</button>
    <button @click="decrease">- 1</button>
  </div>

</template>

<style>
  button{
    background-color: #64BB87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    padding: 5px 15px;
    transition: 0.3s esase-in-out;
  }
  button:hover{
    background-color: #5AA67B;
    transition: 0.3s esase-in-out;
  }
</style>