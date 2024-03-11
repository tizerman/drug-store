import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/product')
      setData(result.data)
    };

    fetchData()
  }, [])

  return (
    <>
      <section id="home">
        <div className="container">
          <div className="home_content">
            {data && data.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home