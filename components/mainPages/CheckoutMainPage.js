import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import useCart from "../../controls/cartControl";
import { useUser } from "@auth0/nextjs-auth0";

function CheckoutMainPage() {
  const {
    cart,
    toCheckout,
    getSelectedCarts,
    checkedItems,
    selectItem,
    deletePayItem,
    incPayItemQnty,
    decPayItemQnty,
    paymentMethod,
    set,
  } = useCart();
  const { user } = useUser();

  useEffect(() => {
    getSelectedItems();
  }, [user, cart]);

  async function getSelectedItems() {
    getSelectedCarts();
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <button onClick={getSelectedItems}>test</button>
        {checkedItems?.map((product) => (
          <Item
            product={product}
            key={product?._id}
            selectItem={selectItem}
            deletePayItem={deletePayItem}
            incPayItemQnty={incPayItemQnty}
            decPayItemQnty={decPayItemQnty}
            type="checkout"
          />
        ))}
      </Box>
      <div className="text-gray-600 bg-orange-50 ring-1 flex flex-col ring-orange-200 min-h-[200px] my-5">
        <div className="flex flex-wrap items-center justify-between p-2 ">
          <h1>Payment Method</h1>
          <select
            name=""
            id=""
            className="p-2 bg-transparent ring-1 ring-orange-400d"
            defaultValue={paymentMethod}
            onChange={(e) => set({ paymentMethod: e.target.value })}
          >
            <option value="online">Online Payment</option>
            <option value="cash">Cask On Dilivery</option>
          </select>
        </div>
        <hr />
        <div className="self-end flex flex-col w-full max-w-sm m-2 p-3 text-gray-500">
          <span className="flex-1 ring-1d min-w-[200px] flex items-center justify-between py-1">
            <p>Total Order:</p>
            <p>
              {checkedItems?.length} order{checkedItems?.length > 1 && "s"}
            </p>
          </span>
          <span className="flex-1 ring-1d min-w-[200px] flex items-center justify-between py-1">
            <p>Total Items: </p>
            <p>
              {checkedItems?.reduce(
                (items, item) => (items += item?.quantity),
                0
              )}
            </p>
          </span>
          <span className="flex-1 ring-1d min-w-[200px] flex items-center justify-between py-1">
            <p>Merchandise Subtotal:</p>
            <p>
              $
              {checkedItems?.reduce(
                (total, item) => total + item.curPrice * item.quantity,
                0
              )}
            </p>
          </span>
          <span className="flex-1 ring-1d min-w-[200px] flex items-center justify-between py-1">
            <p>shiping total:</p>
            <p>$324</p>
          </span>
          <span className="flex-1 ring-1d min-w-[200px] flex items-center justify-between py-1">
            <p>Total Payment:</p>
            <Typography ml={4} variant="h5" color="primary">
              $
              {checkedItems?.reduce(
                (price, item) => price + item.curPrice * item.quantity,
                0
              )}
            </Typography>
          </span>
        </div>
        <hr />
        <div className="flex justify-end p-3">
          <button
            onClick={toCheckout}
            className="bg-[#FF6363] text-white p-2 w-full max-w-xs font-semibold text-lg hover:bg-[#ff8080] "
          >
            Place Order
          </button>
        </div>
      </div>
    </Container>
  );
}

export default CheckoutMainPage;

function Item({ product }) {
  console.log(product);
  return (
    <div className="ring-1 ring-gray-300 p-3 mt-5">
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <Stack direction="row" justifyContent="center">
            <Image
              src={product?.image}
              width={200}
              height={200}
              sx={{ minWidth: "100px", minHeigth: "100px" }}
              objectFit="contain"
            />
            <Typography ml>
              {product?.name?.substring(0, 150)}
              {product?.name?.length >= 150 && "..."}
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={2} sm={2} xs={4}>
          <Typography variant="body2">Unit Price</Typography>
          <Typography>${product?.curPrice}</Typography>
        </Grid>
        <Grid item md={2} sm={2} xs={4}>
          <Typography variant="body2">Amount</Typography>
          <Typography>{product?.quantity}</Typography>
        </Grid>
        <Grid item md={2} sm={2} xs={4}>
          <Typography variant="body2">Item Subtotal</Typography>
          <Typography>{product?.total}</Typography>
        </Grid>
      </Grid>
      <hr className="my-2" />
      <Stack direction="row" spacing={1}>
        <Box sx={{ flexGrow: 1 }} />
        <Box item>
          <Typography variant="body2">Shiping Fee</Typography>
          <Typography>$20 test</Typography>
        </Box>
        <Box item sx={{ marginX: "10px" }}>
          <Typography variant="body2">
            Order Total ({product?.quantity} item{product?.quantity > 1 && "s"})
          </Typography>
          <Typography variant="h5" color="primary">
            $
            {product?.quantity * product?.curPrice + (product?.shipingFee || 0)}
          </Typography>
        </Box>
      </Stack>
    </div>
  );
}