// Header.js

import { FaCartArrowDown } from "react-icons/fa";
import styles from "../styles/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";
import {
  getProductsThunk,
  searchProductsThunk,
} from "../features/products/productsSlice";
import {
  addItem,
  setItems,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";

import Logo from "../../public/logo.png";

function Header() {
  const [itemCount, setItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    dispatch(setItems(storedCartItems));
  }, [dispatch]);

  useEffect(() => {
    setItemCount(items.length);
    // Store items array in localStorage whenever items change
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // scroll top fixed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseBar = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      dispatch(searchProductsThunk(searchQuery));
    } else {
      dispatch(getProductsThunk());
    }
  }, [dispatch, searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddItem = (product) => {
    dispatch(addItem({ product }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`bg-[#bfbddb] py-3 w-full z-10 transition-all duration-300 ${
        isScrolled ? "fixed top-0" : "relative"
      }`}
    >
      <div
        className={`${styles.section} ${styles.normalFlex} justify-between relative`}
      >
        {/* Logo */}

        <img src={Logo} alt="" className=" h-10" />

        {/* Search bar */}
        <SearchInput handleSearch={handleChange} />

        {/* Cart icon with item count */}
        <div className="relative">
          <FaCartArrowDown size={30} onClick={handleCloseBar} />
          <div className="absolute left-6 top-[-10px] bg-white rounded-full w-7 h-7 text-center flex items-center justify-center">
            {itemCount}
          </div>
        </div>

        {/* Cart sidebar */}
        {isCartOpen && (
          <motion.div transition={{ duration: 1 }}>
            <Sidebar
              items={items}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
              handleIncrementQuantity={handleIncrementQuantity}
              handleDecrementQuantity={handleDecrementQuantity}
              handleCloseBar={handleCloseBar}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Header;
