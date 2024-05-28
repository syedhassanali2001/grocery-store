import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductsList from "./_components/ProductsList";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();
  const categoryList= await GlobalApi.getCategoryList();
  const productlist= await GlobalApi.getAllProducts();
  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList}></Slider>
      <CategoryList categoryList={categoryList}></CategoryList>
      <ProductsList productlist={productlist}></ProductsList>
      <Image src="/Banner.jpg" width={1000} height={400}
      alt="banner" className="w-full h-[400px] object-contain mt-6 border rounded-lg bg-green-600"
      />
      <Footer>Footer</Footer>
    </div>
  );
}
