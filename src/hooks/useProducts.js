import { useContext } from "react";
import ProductContext from "../context/ProductContext";

const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === null) {
    throw new Error("useProducts must be used inside a ProductProvider.");
  }

  return context;
};

export default useProducts;
