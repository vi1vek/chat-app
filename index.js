const express = require("express")
const {createServer} = require('node:http')
const {Server} =require('socket.io')

const app = express()
app.use(express.static('public'))
const server = createServer(app)
const io = new Server(server)

app.get('/',(req,res)=>{
    return res.sendFile('index.html')
})

io.on('connection',(Socket)=>{
    console.log(`A user connected : ${Socket.id}`);
    Socket.on("message",(msg)=>{
        // console.log(msg);
        io.emit("message",msg,Socket.id)
    })
})
server.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
    
})