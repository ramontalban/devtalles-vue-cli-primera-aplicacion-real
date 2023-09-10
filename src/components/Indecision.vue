<script>
export default {
  data(){
    return {
      question: 'Hola Mundo',
      answer: null,
      img: null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Pensando...'
      const {answer, image} = await  fetch('https:yesno.wtf/api').then( r => r.json() )
      this.answer = answer === 'yes' ? 'Si' : answer
      this.img = image
    }
  },
  watch: {
    question( value, oldValue ){
      this.isValidQuestion = false
      if( !value.includes('?')) return
      this.isValidQuestion = true
      this.getAnswer()
    }
  }
}
</script>

<template>
  <h1>Indecision</h1>
  <img v-if="img" :src="img" alt="bg">
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input v-model="question" type="text" placeholder="Hazme una pregunta">
    <p>Recuerda terminar con un signo de interrogación (?)</p>
  </div>
  <div v-if="isValidQuestion">
    <h2>{{ question }}</h2>
    <h1>{{ answer }}</h1>
  </div>
</template>

<style>

</style>