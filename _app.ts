import { CSV } from "./CSV.ts";
import { IProduct } from "./models/IProduct.ts";

// deno-lint-ignore no-explicit-any
const factoryProductCast = (arr: any[]): IProduct[] => {
    const products: IProduct[] = arr.map((item) => ({
        id: item.id,
        name: item.name,
        price: +item.price,
        quantity: +item.quantity,
    }));

    return products;
};

const csv = new CSV();
await csv.read("./data.csv");
csv.parse();

const products = factoryProductCast(csv.toArray<IProduct>());

console.log("array :", products);
