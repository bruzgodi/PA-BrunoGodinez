'use strict'
const SerialPort = require('serialport')
const socket = require('socket.io-client')('http://206.189.69.47:8088')

let valorActual= ''
let valorPasado = ''
let tiempoActual=0
let tiempoPasado
let valorGuardado='900'
let isRegando = false

let eje1=0,eje2=0,eje3=0,eje4=0

let port1 = new SerialPort('COM1', {
   baudRate: 9600
})

//
// let port2 = new SerialPort('COM2', {
//   baudRate: 9600
// })
//
// port2.on('data',data=>{
//   console.log(data)
// })

  // tiempoActual = new Date().getTime()
  // if (tiempoActual-tiempoPasado<1800){
  //   valorGuardado=`${valorPasado}${valorActual}`
  // } else {
  //   console.log(valorGuardado)
  //   peticiones.post('/datos', {
  //     nivelAgua:valorActual
  //   }).then(respuesta => console.log(respuesta.data)).catch(error => console.log(error.data))
  //   valorGuardado = valorActual
  // }
  // valorPasado=valorActual
  // tiempoPasado=tiempoActual


socket.on('connect', () => {
  console.log('conectando')
  console.log(socket.id) // 'G5p5...'
})



function enviarASerial(){
  const enviar = `${eje1},${eje2},${eje3},${eje4}\n`
  console.log(enviar)
  port1.write(enviar)
}

socket.on('eje1', (num) => {
  eje1=num.num
  enviarASerial()
})

socket.on('eje2', (num) => {
  eje2=num.num
  enviarASerial()
})

socket.on('eje3', (num) => {
  eje3=num.num
  enviarASerial()
})
socket.on('eje4', (num) => {
  eje4=num.num
  enviarASerial()
})

