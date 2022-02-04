import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Context } from "../Context";
import products from "../data/products.json";
import { currencyOptions } from "../data/currencyOptions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 120,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function ModalCart() {
  const { cart, currencies } = useContext(Context);
  const [cartTotal, setCartTotal] = useState(0);
  const [currency, setCurrency] = useState("USDUSD");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((key) => {
      const product = products.filter((item) => {
        return item.id === Number(key);
      })[0];
      const itemPrice = cart[key] * product?.price;
      total += itemPrice;
    });
    setCartTotal(total);
  };
  const convertedCartTotal =
    currency !== "USDUSD" ? cartTotal * currencies[currency] : cartTotal;

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
        sx={{ alignItems: "center" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Basket
          </Typography>
          <Box sx={{ maxWidth: 120 }}>
            <FormControl sx={{ margin: "20px 0px" }} fullWidth>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                variant="filled"
                labelId="currency-select-label"
                id="currency-select"
                value={currency}
                label="Currency"
                onChange={handleChange}
              >
                {currencyOptions.map((currency) => {
                  return (
                    <MenuItem value={currency.value} key={currency.id}>
                      {currency.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Total :{" "}
            {currency !== "USD" ? currency.replace("USD", "") : currency}{" "}
            {convertedCartTotal.toFixed(2)}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
