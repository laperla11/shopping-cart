import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Context } from "../Context";
import products from "../data/products.json";
import { currencyOptions } from "../data/currencyOptions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCart() {
  const { cart, currencies } = useContext(Context);
  const [cartTotal, setCartTotal] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const newCurrency = e.currentTarget.value;
    setCurrency(newCurrency);
    if (newCurrency !== "USDUSD") {
      setCartTotal(cartTotal * currencies[newCurrency]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((key) => {
      const product = products.filter((item) => {
        return item.id == key;
      })[0];
      const itemPrice = cart[key] * product?.price;
      total += itemPrice;
    });
    if (currency !== "USD") {
      total = total * currencies[currency];
    }
    setCartTotal(total);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
          calculateTotal();
        }}
      >
        checkout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ justifyContent: "center" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Basket
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Currency options
          </Typography>
          <select value={currency} onChange={handleChange}>
            {currencyOptions.map((currency) => {
              return (
                <option value={currency.value} key={currency.id}>
                  {currency.label}
                </option>
              );
            })}
          </select>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Total :{" "}
            {currency !== "USD" ? currency.replace("USD", "") : currency}{" "}
            {cartTotal.toFixed(2)}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
