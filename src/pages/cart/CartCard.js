import { Link } from "react-router-dom";
import { useCart } from "../../providers/cartContext/CartContext";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { removeFromCart } from "../../utils/menu.utils";
import { useAuth } from "../../providers/AuthProvider";

export const CartCard = ({ item }) => {
  const { dispatch, setIsAddLoading } = useCart();
  const { token } = useAuth();

  const goToProductPage = (item) => {
    dispatch({
      type: "GO_TO_PRODUCT_PAGE_FROM_CART",

      payload: item,
    });
  };

  // const removeFromCart = async (item) => {
  //   setIsAddLoading(true);

  //   try {
  //     await axios.delete("https://cook-es-shops.herokuapp.com/cartproducts", {
  //       data: { cartProductId: item._id, productId: item._id },
  //     });

  //     dispatch({ type: "REMOVE_FROM_CART", payload: item });
  //     setIsAddLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="cart-card">
        <div className="cart-card-sub-div">
          <Link to="/products" className="cart-card-img-div">
            <img
              src={item.image[0]}
              alt="img"
              className="cart-card-img"
              onClick={() => goToProductPage(item)}
            />
          </Link>
          <div className="cart-card-content-div">
            <h2>{item.price}/- Rs. </h2>
            <p>{item.name} </p>
            <button
              className="btn-cart remove-btn"
              onClick={() => removeFromCart(item._id, token, dispatch)}
            >
              Remove from cart{" "}
            </button>
          </div>
          <div className="cart-card-btn-div">
            <div className="cart-card-btn-sub-div">
              <button
                className="btn-cart add-minus-btn"
                onClick={() => dispatch({ type: "INCREMENT", payload: item })}
              >
                +
              </button>
              {item.quantity}
              {item.quantity === 1 ? (
                <button
                  className="btn-cart add-minus-btn"
                  onClick={() => removeFromCart(item._id, token, dispatch)}
                >
                  <MdDeleteForever />
                </button>
              ) : (
                <button
                  className="btn-cart add-minus-btn"
                  onClick={() => dispatch({ type: "DECREMENT", payload: item })}
                >
                  -
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
