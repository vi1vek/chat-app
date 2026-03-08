const express = require("express")
const { timeStamp } = require("node:console")
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
        const messageData={
            message:data.message,
            image:data.image,
            timeStamp: new Date().toLocaleTimeString('en-In',{
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })

        }

        io.emit("receive-chat",messageData,Socket.id)
        // console.log(messageData.timeStamp);
        
        
    })
    
})
server.listen(3000,()=>{
    console.log(`server is running at 3000 port`);
    
})