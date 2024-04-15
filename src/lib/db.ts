import { MongoClient } from "mongodb";

let client: MongoClient;

let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URL;

const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

if (!process.env.MONGODB_URL) {

    throw new Error("Please Add Your MongoDB Atlas Connection");

}

client = new MongoClient(uri!, options);

clientPromise = client.connect();

clientPromise
    .then(() => console.log("Connected To MongoDB"))
    .catch((err) => console.error("Failed To Connect To DB ", err));

export default clientPromise;