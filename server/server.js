const mongoose = require('mongoose');
const Document = require('./Document'); 

 mongoose.connect('mongodb://localhost/google-docs-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const DefaultValue="";
const io = require("socket.io")(3001,{

    // cors for cross origin client-server connection support
    cors:{
        origin :"http://localhost:3000",
        methods: ['GET','POST']
    }
});

io.on("connection", socket=>{

    socket.on('get-document', async documentID=>{
        const docs = await findOrCreateDocs(documentID);
        socket.join(documentID);
        socket.emit('load-document',docs.data);
        socket.on("send-changes",delta=>{   
            // console.log(delta);
        
            socket.broadcast.to(documentID).emit("receive-changes",delta); 
            //broadcasting msg for everyone else except for us and delta is the changes
    
        })

        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentID, { data })
        })
    })
    
    // console.log("connected");
});

async function findOrCreateDocs(id){

    if(id==null) return;

    const document = await Document.findById(id);

    if(document) return document;
    return await Document.create({_id:id, data:DefaultValue});


}