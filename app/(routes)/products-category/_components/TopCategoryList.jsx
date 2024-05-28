import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { decode } from 'url-encode-decode'

function TopCategoryList({categoryList,selectedCategory}) {
  return (
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center'>
    {categoryList.map((category, index) => (
      <Link href={'/products-category/'+category.attributes.name}
        className={`flex flex-col items-center bg-blue-50 
        gap-2 p-4 rounded-lg group cursor-pointer
        hover:bg-blue-200 w-[150px] min-w-[100px]
        ${selectedCategory==category.attributes.name&&'bg-blue-600 text-white'}`}
        key={index}
      >
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            category.attributes.icon.data[0].attributes.url
          }
          alt="categories"
          width={50}
          height={50}
          className='group-hover:scale-125 transition-all ease-in-out'
        />
        <h2 className={`group-hover:text-white 
        ${selectedCategory==category.attributes.name&&'text-white'}`}>
            {category.attributes.name}
        </h2>
      </Link>
    ))}
  </div>
  )
}

export default TopCategoryList