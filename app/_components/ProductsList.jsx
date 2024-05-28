import React from 'react'
import ProductItem from './ProductItem'

function ProductsList({productlist}) {
  return (
    <div className='mt-5'>
      <h2 className="text-blue-600 font-bold text-2xl">Our Popular Products</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
        {productlist.map((product,index)=>(
          <ProductItem product={product} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default ProductsList