

const mongoose = require('mongoose');


function connectDB() {
    try{
        if(!process.env.CONNECT_URI){
            console.log("Please provide a connection string")
            process.exit(1);
        }
        mongoose.connect(
            process.env.CONNECT_URI
        ).then(()=>console.log("Connected to database"))
        .catch((error)=>{
            console.log("Error occured while connecting to database :" + error)
            process.exit(1);
        })

    }catch(err){
        console.log("Error occured while connecting to database :" + err)
    }
}

mongoose.connect(
    process.env.CONNECT_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 60000 // Set the connection timeout to 60 seconds (adjust as needed)
    }
).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Error occurred while connecting to database: " + error);
    process.exit(1);
});

const options = {
    bufferTimeoutMS: 30000, // Increase buffer timeout to 30 seconds
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.CONNECT_URI, options)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Error occurred while connecting to database:', error));

module.exports = connectDB;