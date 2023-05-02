import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import useProduct from "../../controls/productControls";
import BannerMain from "../banners/BannerMain";
import ProductCategories from "../banners/ProductCategories";
import ProductCategory from "../banners/ProductCategory";
import LoaderBannerMain from "../loader/LoaderBannerMain";
import LoaderProductLists from "../loader/LoaderProductLists";
import ProductsLists from "../ProductsLists";

function ProductPage({ productLists, products }) {
  const { products: clientProducts, getMainProduct, loading } = useProduct();
  const serverProducts = products ? JSON.parse(products) : [];

  const myprods = useQuery(
    ["products"],
    async () => {
      
      const res = await axios.post("/api/products/", { type: "all" });
      return res?.data;
    },

    {
      onSuccess(data) {
      },
      onError(err) {
      },
    }
  );

  useEffect(() => {
    getMainProduct();
  }, []);


  return (
    <div className="max-w-[1200px] mx-auto px-[3%]">
      <BannerMain />
      <ProductCategories />
      <ProductCategory
        category="device"
        url={
          "https://res.cloudinary.com/dx8mmwiyp/image/upload/v1654343790/snapdeal-great-sale-november-2015_jnoek3.jpg"
        }
      />
      <ProductsLists products={myprods.data} />
      {/* <ProductsLists products={serverProducts || clientProducts} /> */}
    </div>
  );
}

export default ProductPage;

function LoadingView() {
  return (
    <Container maxWidth="lg">
      <div className="py-5">
        <LoaderBannerMain />
        <br />
        <LoaderProductLists />
      </div>
    </Container>
  );
}
