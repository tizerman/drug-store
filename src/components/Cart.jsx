import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart, removeItem, incrementItem, decrementItem, clearCart } from '../store/slices/cartSlice'
import axios from 'axios'
import Modal from './Modal'

const Cart = () => {
  const { isCartOpen, cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };  

  const handleSubmit = (formData) => {
    handleCheckout(formData);
    setIsModalOpen(false);
  };

  const handleCloseCart = (close) => {
      dispatch(toggleCart(close))
  };

  const handleRemove = (itemId) => {
      dispatch(removeItem(itemId))
  };

  const handleIncrement = (itemId) => {
      dispatch(incrementItem(itemId))
  };

  const handleDecrement = (itemId) => {
      dispatch(decrementItem(itemId))
  };

  const handleCheckout = async (formData) => {
    try {
      const response = await axios.post('/api/order', {
        ...formData,
        orderItems: cartItems,
      });

      if (response.status === 200) {
        alert('Order has been placed successfully!')
        dispatch(clearCart())
      } else {
        alert('There was an error placing your order. Please try again.')
      }
    } catch (error) {
      console.error('There was an error placing your order:', error)
    }
  };

  useEffect(() => {
    const docBody = document.body;

    isCartOpen ? (
        docBody.classList.add('overflow_hide')
    ) : (
        docBody.classList.remove('overflow_hide')
    )

  }, [isCartOpen])

  useEffect(() => {
    const outsideClose = (e) => {
        if (e.target.id === 'cart') {
            handleCloseCart(false)
        }
    }

    window.addEventListener('click', outsideClose)

    return () => window.removeEventListener('click', outsideClose)

  }, [handleCloseCart])

  const cartQuantity = cartItems.length
  const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0)

  return (
    <>
      {
        isCartOpen && (
          <div id="cart">
            <div className="cart_content">
              <div className="cart_head">
                <h2>Cart <small>({cartQuantity})</small></h2>
                <div
                  title="Close"
                  className="close_btn"
                  onClick={() => handleCloseCart(false)}
                >
                  <span>&times;</span>
                </div>
              </div>

              <div className="cart_body">
                {
                  cartQuantity === 0 ? (
                      <h2>Cart is empty</h2>
                  ) : (
                    cartItems.map(item => {
                      const { id, image, title, price, quantity } = item;
                      const itemTotal = price * quantity;

                      return (
                        <div className="cart_items" key={id}>
                          <figure className="cart_items_img">
                            <img src={image} alt="product-img" />
                          </figure>

                          <div className="cart_items_info">
                            <h4>{title}</h4>
                            <h3 className="price">$ {itemTotal.toLocaleString()}</h3>
                          </div>

                          <div className="cart_items_quantity">
                            <span onClick={() => handleDecrement(id)}>&#8722;</span>
                            <b>{quantity}</b>
                            <span onClick={() => handleIncrement(id)}>&#43;</span>
                          </div>

                          <div
                            title="Remove Item"
                            className="cart_items_delete"
                            onClick={() => handleRemove(id)}
                          >
                            <span>&times;</span>
                          </div>
                        </div>
                      );
                    })
                  )
                }
              </div>

              <div className="cart_foot">
                <h3>
                  <small>Total:</small>
                  <b>$ {cartTotal.toLocaleString()}</b>
                </h3>

                <button
                  type="button"
                  className="checkout_btn"
                  disabled={cartQuantity === 0}
                  onClick={handleOpenModal}
                >
                  Checkout
                </button>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />

              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Cart;