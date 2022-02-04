import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Context } from "../Context";

const CardItem = ({ id, description, price, UOM }) => {
  const { cart, setCart } = useContext(Context);

  const handleChange = (e) => {
    setCart({ ...cart, [id]: e.currentTarget.value });
  };

  const handleAddItem = () => {
    setCart({ ...cart, [id]: 1 });
  };

  const increment = () => {
    setCart({ ...cart, [id]: cart[id] + 1 });
  };

  const decrement = () => {
    setCart({ ...cart, [id]: cart[id] - 1 });
  };

  const value = cart[id] ? cart[id] : 0;
  return (
    <Stack direction="column" alignItems="center">
      <CardContent>
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="body2">
          <span>${price}</span> per {UOM}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <FormControl sx={{ width: "15ch" }}>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input
              id="component-simple"
              value={value}
              onChange={handleChange}
            />
          </FormControl>
          {value === 0 && (
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Button
                label="Add"
                variant="outlined"
                color="primary"
                onClick={handleAddItem}
              >
                Add
              </Button>
            </Stack>
          )}
          {value !== 0 && (
            <Stack direction="row" justifyContent="center" spacing={2}>
              <RemoveCircleOutlineIcon color="primary" onClick={decrement} />
              <AddCircleOutlineIcon color="primary" onClick={increment} />
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Stack>
  );
};

export default function OutlinedCard(props) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardItem {...props} />
      </Card>
    </Box>
  );
}
