import { useCart } from "../providers/CartContext";
import { WishlistCard } from "./WishlistCard";
import { Header } from "../components/Header";
import { ToggleSideNav } from "../components/ToggleSideNav";
import { ToggleHeader } from "../components/ToggleHeader";
import { Footer } from "../components/Footer";
import axios from "axios";
import { useEffect } from "react";

export const Wishlist = () => {
  const { state, dispatch, setIsLoader } = useCart();

  useEffect(() => {
    (async function () {
      setIsLoader(true);
      try {
        const cakeResponse = await axios.get(`/product/cakes`);
        const cartResponse = await axios.get(`cartproducts`);
        const wishlistResponse = await axios.get(`wishlistproducts`);

        dispatch({
          type: "INITIALIZE_DATA",
          payload1: cakeResponse.data,
          payload2: cartResponse.data,
          payload3: wishlistResponse.data,

          category: "cake",
        });
        setIsLoader(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <ToggleHeader />
      <ToggleSideNav />
      <Header />

      <div className="background-img-div">
        <div className="product-list">
          {state.wishlistListItem.map((item) => (
            <WishlistCard item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
