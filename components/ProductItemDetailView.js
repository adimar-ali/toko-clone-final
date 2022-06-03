import ProductQuantityEditor from "./others/ProductQuantityEditor"
import ProductImages from "./ProductImages"
import { useEffect } from "react"
import { Container, Grid, Stack, Typography } from "@mui/material"
import ProductRating from "./others/ProductRating"
import ProductPricing from "./others/ProductPricing"
import ProductsLists from "./ProductsLists"
import useCart from "../controls/cartControl"
import useProduct from "../controls/productControls"
import { useRouter } from "next/router"
import ProductExtras from "./others/ProductExtras"



function ProductItemDetailView({ productItem }) {
    const { getCurrentProduct, curProduct, curPrice } = useCart()
    const { getAllProducts, products } = useProduct()
    const router = useRouter()
    const { id } = router.query
    console.log(curProduct)

    useEffect(() => {
        if (!id) return
        getCurrentProduct(id)
        getAllProducts()
    }, [id])

    return (
        <Container maxWidth='lg' color='white'>
            <Grid container spacing={2} color='primary' sx={{ padding: 2 }}>
                <Grid item xs={12} sm={6}>
                    <ProductImages images={curProduct?.images} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h4">{curProduct?.title}</Typography>
                    <Typography variant='body1'>{curProduct?.description}</Typography>
                    <ProductRating ratings={curProduct?.ratings} sold={curProduct?.sold} />
                    <hr />
                    <ProductPricing price={curPrice} />
                    <hr />
                    <ProductExtras />
                    <ProductQuantityEditor stock={curProduct?.stock} />
                    <hr />
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='body2'>Stocks: {curProduct?.stock}</Typography>
                        <Typography variant='body2'>Sold: {curProduct?.sold}</Typography>
                        <Typography variant='body2'>Category: {curProduct?.category}</Typography>
                        <Typography variant='body2'>: </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <br />
            <ProductsLists products={products} />
        </Container>
    )
}

export default ProductItemDetailView

