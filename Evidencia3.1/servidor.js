'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const SerialPort = require('serialport')
const peticiones = require('trae')
const cors = require('cors')
app.use(cors())

let valorActual= ''
let valorPasado = ''
let tiempoActual=0
let tiempoPasado
let valorGuardado='900'
let isRegando = false

const server = app.listen(8088, function (err) {
  if (err) return console.log('Hubo un error :(')
  console.log(`:3 escuchando en el puerto 8088`)
})

const io = require('socket.io')(server)

function datosParaEnviar (){
  return{
    isRegando,
    nivelAgua:-( Number(valorGuardado)*0.0976563)+100,
    nivelNoAgua:(Number(valorGuardado)*0.0976563)
  }
}

io.on('connection', (socket) => {
  console.log('conectandose al socket ' + socket.id)

  socket.on('recibirEje1',(num)=>socket.broadcast.emit('eje1',{num}))
  socket.on('recibirEje2',(num)=>socket.broadcast.emit('eje2',{num}))
  socket.on('recibirEje3',(num)=>socket.broadcast.emit('eje3',{num}))
  socket.on('recibirEje4',(num)=>socket.broadcast.emit('eje4',{num}))

  socket.on('enviarNivel',(nivel)=>{
    valorGuardado = nivel
    socket.broadcast.emit('recibirDatos',datosParaEnviar())
  })

  socket.on('enviarRegar',()=>{
    console.log('entrando en enviar regar')
    isRegando=true
    socket.broadcast.emit('enviarRegar',datosParaEnviar())
    socket.emit('enviarRegar',datosParaEnviar())
  })

  socket.on('enviarDetener',()=>{
    console.log('entrando en enviar detener')
    isRegando=false
    socket.broadcast.emit('enviarRegar',datosParaEnviar())
    socket.emit('enviarRegar',datosParaEnviar())
  })

})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/static',express.static(__dirname + '/dist/static'))
app.use('/node_modules/jquery', express.static(__dirname + '/node_modules/jquery'))
app.use('/src/assets', express.static(__dirname + '/src/assets'))

app.get(['/','/controles'], (req, res) => {
  res.sendFile('./dist/index.html', {root: __dirname})
})






app.post('/eje2',(req,res)=>{
  io.sockets.emit('eje2',{num:req.body.num})
  res.status(200).send({mensaje:'ok'})
})

app.post('/eje3',(req,res)=>{
  io.sockets.emit('eje3',{num:req.body.num})
  res.status(200).send({mensaje:'ok'})
})

app.post('/eje4',(req,res)=>{
  io.sockets.emit('eje4',{num:req.body.num})
  res.status(200).send({mensaje:'ok'})
})

