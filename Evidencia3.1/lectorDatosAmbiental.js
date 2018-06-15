'use strict'
const SerialPort = require('serialport')
const socket = require('socket.io-client')('http://206.189.69.47:8088')

let valorActual= ''
let valorPasado = ''
let tiempoActual=0
let tiempoPasado=0
let valorGuardado='900'

let eje1=0,eje2=0,eje3=0,eje4=0

let port1 = new SerialPort('COM4', {
   baudRate: 9600
})


port1.on('data', function (datos) {
  tiempoActual = new Date().getTime()
  valorActual = datos.toString('utf8')
  if (tiempoActual-tiempoPasado<400){
    valorGuardado=`${valorPasado}${valorActual}`
  } else {
    socket.emit('enviarNivel',valorGuardado)
    valorGuardado = valorActual
  }
  valorPasado=valorActual
  tiempoPasado=tiempoActual
})

// port1.on('data',datos=>{
//   tiempoActual = new Date().getTime()
//   valorActual = datos.toString('utf8')
//   console.log(datos.toString())
//   if (tiempoActual-tiempoPasado<400){
//     valorGuardado=`${valorPasado}${valorActual}`
//   } else {
//     if(valorGuardado.split('\r\n')[1]>1){
//       console.log(valorGuardado.split('\r\n')[1])
//       socket.emit('enviarNivel',valorGuardado.split('\r\n')[1])
//     }
//     valorGuardado = valorActual
//   }
//   valorPasado=valorActual
//   tiempoPasado=tiempoActual
// })
//



socket.on('connect', () => {
  console.log('conectando')
  console.log(socket.id) // 'G5p5...'
})


socket.on('enviarRegar', (datos) => {
  console.log('entrando en enviando regar')
  port1.write('g')

})


