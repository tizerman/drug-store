import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/slices/cartSlice'

const ProductCard = (props) => {
  const { image, rating, title, price } = props
  const [isAdded, setIsAdded] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
      const item = { ...props, quantity: 1 }
      dispatch(addItem(item))

      setIsAdded(true)

      setTimeout(() => {
          setIsAdded(false)
      }, 3000)
  }

  return (
    <>
      <div className="product_card">
        <figure>
          <img src={image} alt="product-image" />
        </figure>
        <strong className="rating">{rating}</strong>
        <h4 className="title">{title}</h4>
        <h3 className="price">$ {price.toLocaleString()}</h3>
        <button
          type="button"
          className={`btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </>
  )
}

export default ProductCard