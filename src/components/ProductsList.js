import { v4 as uuid } from "uuid";
import products from "../data/products.json";
import Product from "./Product";

const ProductsList = () => {
  return (
    <ul>
      {products.map((product) => {
        return <Product {...product} key={uuid()} />;
      })}
    </ul>
  );
};

export default ProductsList;
