import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, searchProducts } from "./productApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  status: "",
  products: [],
};

export const getProductsThunk = createAsyncThunk(
  "shopping/products",
  async () => {
    const products = await getAllProducts();
    return products;
  }
);

// Async thunk for searching products
export const searchProductsThunk = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery) => {
    const products = await searchProducts(searchQuery);
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.status = "loading";
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
