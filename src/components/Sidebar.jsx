import { FaPlus, FaMinus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ items, handleCloseBar }) {
  const dispatch = useDispatch();

  // Calculate total price of all items
  const totalPrice = items.reduce((total, product) => {
    return total + product.totalPrice;
  }, 0);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute h-[100vh] w-[100vw] md:w-[50vw] bg-white top-[-12px] left-[-5%] md:left-[50%] overflow-y-auto no-scrollbar"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: .5 }}
      >
        <div className="px-10 py-8 flex justify-between">
          <h3 className="text-xl font-bold"> Cart Items</h3>
          <RxCross1 size={22} className="" onClick={(e) => handleCloseBar(e)} />
        </div>
        <div className="px-10 py-5">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            console.log(product.id);
                            dispatch(removeItem(product.id));
                          }}
                        >
                          <RxCross1 />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 font-bold">{product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex">
                        <p className="text-md font-bold">${product.totalPrice}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaMinus
                          size={17}
                          onClick={() => dispatch(decrementQuantity(product.id))}
                          className="cursor-pointer"
                        />
                        <p className="text-gray-500 text-md font-bold">{product.quantity}</p>
                        <div
                          onClick={() => dispatch(incrementQuantity(product.id))}
                          className="cursor-pointer"
                        >
                          <FaPlus size={17} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <hr className="mt-3" />
            </ul>
          </div>
        </div>
        {items.length > 0 ? (
          <div className="px-10 flex justify-between py-4">
            <span className="font-bold text-xl">Total Price :</span>
            <span className="font-bold text-xl"> ${totalPrice.toFixed(2)}</span>
          </div>
        ) : (
          <p className="px-10">Cart Empty</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Sidebar;
