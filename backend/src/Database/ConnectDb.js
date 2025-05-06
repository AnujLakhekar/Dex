import mongoose from "mongoose"


const ConnectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected "+res.connection.host)
  } catch (e) {
    console.log(e.message)
  }
}

export default ConnectDb