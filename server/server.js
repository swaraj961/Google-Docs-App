const io = require("socket.io")(3001,{

    // cors for cross origin client-server connection support
    cors:{
        origin :"http://localhost:3000",
        methods: ['GET','POST']
    }
});

io.on("connection", socket=>{

    socket.on("send-changes",delta=>{
        // console.log(delta);

        socket.broadcast.emit("receive-changes",delta); //broadcasting msg for everyone else except for us and delta is the changes
        
    })
    // console.log("connected");
})

