import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductsList from '@/app/_components/ProductsList';
import { decode } from 'url-encode-decode';

async function ProductCategory({params}) {

    const productList= await GlobalApi.getProductsbyCategory(params.categoryName);
    const categoryList= await GlobalApi.getCategoryList();
    
  return (
    <div>
        <h2 className='p-4 text-white bg-primary font-bold text-3xl text-center'>
            {decode(params.categoryName)}
        </h2>
        <TopCategoryList categoryList={categoryList}
        selectedCategory={decode(params.categoryName)}></TopCategoryList>
        <div className='p-5 md:p-10'><ProductsList productlist={productList}></ProductsList></div>
    </div>
  )
}

export default ProductCategory