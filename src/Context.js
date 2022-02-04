import { createContext, useState, useEffect } from "react";

import { currencyOptions } from "./data/currencyOptions";

// create context
export const Context = createContext();

//Provider componenet
export const Provider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [currencies, setCurrencies] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const currencyForQuery = currencyOptions
    .map((currency) => {
      if (currency.label !== "USD") {
        return currency.label;
      }
    })
    .join();

  useEffect(() => {
    fetch(
      `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${currencyForQuery}&source=USD&format=1`
    ).then((res) =>
      res
        .json()
        .then((data) => setCurrencies(data?.quotes))
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <Context.Provider
      value={{
        cart,
        setCart,
        currencies,
      }}
    >
      {children}
    </Context.Provider>
  );
};
