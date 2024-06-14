import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../features/products/productsSlice";
import { originalPrice } from "../utils/calculateOriginalPrice";
import { calculateAverageRating } from "../utils/calculateRatings";
import { createStars } from "../utils/createStars";
import { addItem } from "../features/cart/cartSlice";



function Products() {
  // Product slice
  const { isLoading, isError, error, products } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  // Add to cart
  const addToCartHandler = (e, product) => {
    e.preventDefault();
    dispatch(addItem({ product }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
      {products.map((product) => (
        <div key={product.id} className="p-6 bg-slate-50 rounded-lg hover:shadow-md">
          <a href={product.href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.thumbnail}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:cursor-pointer"
              />
            </div>
            <h3 className="text-xl pt-4 pb-2 tracking-tight text-slate-900">
              {product.title}
            </h3>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  $ {product.price.toFixed(2)}
                </span>
                <span className="text-sm text-slate-900 line-through">
                  $ {originalPrice(product.price, product.discountPercentage)}
                </span>
              </p>

              {/* Product rating */}
              <div className="flex items-center">
                {createStars(calculateAverageRating(product))}
              </div>
            </div>
            <a
              href=""
              className="flex items-center justify-center rounded-md bg-[#6f91ff] px-5 py-2.5 text-center text-sm font-medium text-white  outline-none border-none"
              onClick={(e) => addToCartHandler(e, product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Products;
