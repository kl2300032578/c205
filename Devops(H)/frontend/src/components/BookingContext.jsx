import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (service, date) => {
    setOrders([...orders, { service, date }]);
  };

  return (
    <BookingContext.Provider value={{ orders, addOrder }}>
      {children}
    </BookingContext.Provider>
  );
};
