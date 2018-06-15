<template>
  <div class="fondo">
    <div class="titulo colorFondo">
      Higrómetro
    </div>
    <div class="cajaGrafica colorFondo">
    </div>
    <div class="cajaCanvas">
      <div class="cajaCentrada">
        <canvas id="myChart"></canvas>
      </div>
      <span class="centroGrafica">{{porcentaje}}%</span>
    </div>
    <button @click="regar" class="botonRegar" v-show="!isRegando">Regar  <i class="fa fa-shower" aria-hidden="true"></i></button>
    <button @click="detener" class="botonDetener" v-show="isRegando">Detener <i class="fa fa-times" aria-hidden="true"></i></button>
  </div>
</template>

<script>
  import {regar} from '../api/api'
  import {detener} from '../api/api'
  import {pedirDatos} from '../api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      porcentaje: 40,
      restante:60,
      isRegando: false,
      socket:null
    }
  },
  methods:{
    regar(){
      console.log('regando')
      this.socket.emit('enviarRegar')
    },
    detener(){
      this.socket.emit('enviarDetener')
    }
  },
  mounted: function () {
    this.$nextTick(()=> {
      this.socket = require('socket.io-client')('http://206.189.69.47:8088')
      this.socket.on('connect', () => {
        console.log('conectando cliente'+this.socket.id); // 'G5p5...'
      })
      this.socket.on('recibirDatos', (datos) => {
        console.log('recibiendo datos')
        console.log(datos)
        this.isRegando = datos.isRegando
        this.porcentaje = Number(datos.nivelAgua).toFixed(0)
        this.restante = Number(datos.nivelNoAgua).toFixed(0)
        grafica.config.data.datasets[0].data[0] = Number(datos.nivelAgua).toFixed(2)
        grafica.config.data.datasets[0].data[1] = Number(datos.nivelNoAgua).toFixed(2)
        grafica.update()

      });
      let ctx = document.getElementById("myChart").getContext('2d');
      let grafica = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Agua",""],
          datasets: [{
            data: [this.porcentaje, this.restante],
            backgroundColor: [
              'rgba(40, 220, 250, 0.2)',
              'rgba(240, 240, 240, 0.2)'
            ],
            borderColor: [
              'rgba(20, 220, 250, 1)',
              'rgba(240, 240, 240, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          cutoutPercentage:92 ,
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'rgba(40, 220, 250, 0.8)',
              fontSize: 15
            }
          }
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fondo{
    background-image: url("../assets/fondo.jpg");
    height: 100vh;
    width: 100vw;
    position: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .colorFondo{
    background-color: rgba(1, 1, 1, 0.7);
  }

  .titulo{
    font-size: 2em;
    color: white;
    font-family: "Roboto Thin";
    padding: 10px;
  }

  .cajaGrafica{
    width: 58vw;
    height: 58vw;
    max-height: 450px;
    max-width: 450px;
    margin: 20px auto;
    border-radius: 5px;
  }

  .cajaCanvas{
    top: 90px;
    position: absolute;
    width: 100vw;
  }
  .cajaCentrada{
    margin: 0 auto;
    max-width: 810px;
  }
  .centroGrafica{
    font-size: 7em;
    top: 140px;
    position: absolute;
    color: greenyellow;
    font-family: "Roboto Thin";
    margin-left: -100px;
  }

  @media only screen and (max-width: 830px) {
    .centroGrafica{
      top: 16vw;
    }
  }

  @media only screen and (max-width: 550px) {
    .centroGrafica{
      top: 32vw;
      font-size: 6.5em;
    }
    .cajaGrafica{
      width: 90vw;
      height: 90vw;
    }
    .cajaCanvas{
      width: 170vw;
      margin-left: -35vw;
    }
    .botonRegar{
      width: 90vw !important;
      max-width: 500px;
    }
    .botonDetener{
      width: 90vw !important;
      max-width: 500px;
    }
  }

  .botonRegar{
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #08c4ff;
    color: white;
    font-size: 1.5em;
    font-family: "Roboto Light";
    width: 58vw;
    height: 50px;
    border-radius: 5px;
    display: block;
    margin: 10px auto;
    transition: 0.3s;
  }
  .botonRegar:hover{
    background-color: #08c4ff;
    color: white;
  }

  .botonDetener{
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #ff0e3f;
    color: white;
    font-size: 1.5em;
    font-family: "Roboto Light";
    width: 58vw;
    height: 50px;
    border-radius: 5px;
    display: block;
    margin: 10px auto;
    transition: 0.3s;
  }
  .botonDetener:hover{
    background-color: #ff0e3f;
    color: white;
  }
  button i.fa-times{
    color: #ff0e3f;
    margin-left: 30px;
  }

  button i.fa-shower{
    color: #08c4ff;
    margin-left: 30px;
  }
  button:hover i.fa-times{
    color: white;
  }

  button:hover i.fa-shower{
    color: white;
  }
</style>
