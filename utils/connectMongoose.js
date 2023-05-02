const { default: mongoose } = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

// const MONGO_URL =
//   "mongodb+srv://adimar:adimar123@cluster0.rxkel.mongodb.net/?retryWrites=true&w=majority";


if (!MONGO_URL) {
  throw new Error("please provide a mongo url");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose?.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// export const connectMongo = async () => mongoose.connect(process.env.MONGO_URL);

// export default connectMongo;
