let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require('socket.io')(http);

let messages = ["Thanks for sending a message to me.", "I appreciate the message!", "This is the server reply...", "This is a random message!", "Tell me anything you want!"];

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    socket.on("clientMsg",(msg)=> {
        console.log(msg);
        socket.emit("serverMsg",messages[Math.floor(Math.random()*messages.length)]);
    })
})


// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));