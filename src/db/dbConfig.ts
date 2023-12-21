import mongoose, { connection } from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.DATABASE_URI!, {
            dbName: "next_todo"
        })

        //On Successful Connection
        connection.on("connected", ()=>{
            console.log("Connected to Database")
        })

        //On Error Connection
        connection.on("error", (err)=>{
            console.log(err)
            process.exit()
        })

    }catch{
        console.log("error connecting database")
    }
}