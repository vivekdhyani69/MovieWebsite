// ////That is basically used to send and gets data parents to any children easily
// Context-Api nad context hook
// Basically both are one
// without context we can't direct access parent data but with the help of context we can directly access parent data .
// context -Api has 3 parts 1.) warehouse 2. Delivery boy 3 you consumer but this consumer part is lengthy thrn now we used context hook
// we directly access now
// Imp==delivery boy appProvider ko cover kr do main app parent app ne uske baad he access kr skte hai

////////////////////////////////////
//1.) context (Warehouse)
//2.) Provider (delivery-boy)
//3.) consumer (You and we)

import React, { useContext, useEffect, useState } from "react";

//fake movie Api omd
export const Api_Url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext(); //that is a warehouse of react

//Now we need to create a provider
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");
  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        //agr data mil gaya toh setIsError is false
        setIsLoading(false);

        setMovie(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //jesa component reload hoga vesa ek br ye useEffect chlega
    const timerOut = setTimeout(() => {
      getMovie(`${Api_Url}&s=${query}`);
    }, 500);
    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    //yha se data passed value me
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

///Makes global context Hooks this function is used any child component
const useGlobalContext = () => {
  //that is we consumer
  return useContext(AppContext); //that is use context hook
};
export { AppProvider, useGlobalContext, AppContext };
