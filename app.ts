import { CSV } from "./CSV.ts";
import { IProduct } from "./models/IProduct.ts";

const csv = new CSV();
await csv.read("./data.csv");
csv.parse();

const products = csv.toArray<IProduct>();

console.log("array :", products);
