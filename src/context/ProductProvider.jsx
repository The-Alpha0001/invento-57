import { useEffect, useRef, useState } from "react";
import ProductContext from "./ProductContext";

const STORAGE_KEY = "invento-products";

function loadProducts() {
  try {
    const savedProducts = window.localStorage.getItem(STORAGE_KEY);

    if (savedProducts === null) {
      return [];
    }

    const parsedProducts = JSON.parse(savedProducts);
    const isValid =
      Array.isArray(parsedProducts) &&
      parsedProducts.every(
        (product) =>
          product &&
          (typeof product.id === "string" || typeof product.id === "number") &&
          typeof product.name === "string" &&
          Number.isInteger(product.quantity) &&
          product.quantity >= 0,
      );

    if (!isValid) {
      throw new Error("Saved inventory has an invalid format.");
    }

    return parsedProducts;
  } catch (error) {
    console.error("Unable to load the saved inventory:", error);
    return [];
  }
}

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(loadProducts);
  const hasChanged = useRef(false);

  useEffect(() => {
    if (!hasChanged.current) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Unable to save the inventory:", error);
    }
  }, [products]);

  function addProduct(product) {
    hasChanged.current = true;
    setProducts((currentProducts) => [
      ...currentProducts,
      { ...product, id: window.crypto.randomUUID() },
    ]);
  }

  function updateProduct(updatedProduct) {
    hasChanged.current = true;
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  }

  function deleteProduct(id) {
    hasChanged.current = true;
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
