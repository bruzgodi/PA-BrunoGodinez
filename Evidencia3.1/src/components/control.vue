<template>
  <div class="contenedor">
    <div class="fondo"> </div>
    <div class="contenedorBotones">
      <p class="titulo">Base</p>
      <p class="range-field">
        <input type="range" id="eje1" min="0" max="360" v-model="eje1" @input="enviarEje1" />
        <span class="thumb"><span class="value">48</span></span>
      </p>
      <p class="titulo">Eslabon 1</p>
      <p class="range-field">
        <input type="range" id="eje2" min="0" max="360" v-model="eje2" @input="enviarEje2"/>
      </p>
      <p class="titulo">Eslabon 2</p>
      <p class="range-field">
        <input type="range" id="eje3" min="0" max="360" v-model="eje3" @input="enviarEje3"/>
      </p>
      <p class="titulo">Eslabon 3</p>
      <p class="range-field">
        <input type="range" id="eje4" min="0" max="360" v-model="eje4" @input="enviarEje4"/>
      </p>
    </div>

  </div>

</template>

<script>

export default {
  name: 'control',
  data () {
    return {
      eje1:40,
      eje2:60,
      eje3:200,
      eje4:290,
      socket:null
    }
  },
  methods:{
    enviarEje1(){
      this.socket.emit('recibirEje1', this.eje1)
    },
    enviarEje2(){
      this.socket.emit('recibirEje2', this.eje2)
    },
    enviarEje3(){
      this.socket.emit('recibirEje3', this.eje3)
    },
    enviarEje4(){
      this.socket.emit('recibirEje4', this.eje4)
    }

  },
  mounted: function () {
    this.$nextTick(()=> {
      this.socket = require('socket.io-client')('http://206.189.69.47:8088')
      this.socket.on('connect', () => {
        console.log('conectando cliente'+this.socket.id); // 'G5p5...'
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contenedor{
    overflow-y: scroll;
    overflow-x: hidden;
  }

  input[type=range]::-webkit-slider-thumb{
    background-color: #ff631f;
    height: 26px;
    width: 26px;
    margin-top: -12px;
  }

  .fondo{
    background-image: url("../assets/fondoControl.jpg");
    width: 104vw;
    height: 102vh;
    margin-left: -2vw;
    position: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    filter: blur(5px);
  }

  .contenedorBotones{
    width: 80vw;
    margin-left: 10vw;
  }

  .titulo{
    font-family: "Roboto Thin";
    font-size: 2em;
    color: white;
    position: relative;
    margin-bottom: 0;
    margin-top: 50px;
  }
</style>
