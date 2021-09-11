let express = require("express");

let mongoose = require("mongoose");

let url = "mongodb://localhost:27017/chatlog";
mongoose.pluralize(null);

mongoose.connect(url).then(res=>console.log("Connected to database...")).catch(err=>console.log(err));

let db = mongoose.connection;
let chatSchema = mongoose.Schema({
    name:String,
    message:String
});

let chatModel = mongoose.model("chats",chatSchema);

let app = express();

let http = require("http").Server(app);

let io = require('socket.io')(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    socket.on("clientMsg",(msg)=> {
        let newChat = new chatModel({name:msg.name, message: msg.message});
        console.log("from socket is:" + newChat);
        chatModel.insertMany(newChat,(err,result)=> {
            if(!err){
                console.log(result)
            } else {
                console.log(err);
            } 
        })
    })
})


http.listen(9090,()=>console.log("Server running on port 9090..."));