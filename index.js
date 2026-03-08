const express = require("express")
const {createServer} = require('node:http')
const {Server} =require('socket.io')

const app = express()
app.use(express.static('public'))
const server = createServer(app)
const io = new Server(server,{
    maxHttpBufferSize: 1e7
})

app.get('/',(req,res)=>{
    return res.sendFile('index.html')
})

io.on('connection',(Socket)=>{
    console.log(`A user connected : ${Socket.id}`);
    Socket.on("chat-message",(data)=>{
        // console.log(data.message);
        // console.log(data.image);
        io.emit("receive-chat",{
            message:data.message,
            image:data.image
        },Socket.id)
        
    })
    
})
server.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
    
})