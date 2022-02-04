import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Context } from "./Context";
import ProductsList from "./components/ProductsList";
import ModalCart from "./components/Modal";

function App() {
  const { cart } = useContext(Context);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: "100vh" }}>
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Shopping Cart
        </Typography>
        <ProductsList />
        {!!Object.keys(cart)?.length && <ModalCart />}
      </Box>
    </Container>
  );
}

export default App;
