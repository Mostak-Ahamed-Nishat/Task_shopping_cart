import axios from "axios";

export const getAllProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
};

// Search products by query
export const searchProducts = async (query) => {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return response.data.products;
};
