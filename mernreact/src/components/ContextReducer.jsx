import React,{createContext, useReducer,useContext}from "react";
const cartstatecontext=createContext();
const cartdispatchcontext=createContext();


            const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      return [];

    case "UPDATE": {
      let arr = [...state];
      arr = arr.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          const updatedQty = food.qty + parseInt(action.qty);
          const updatedPrice = food.price + action.price;
          return { ...food, qty: updatedQty, price: updatedPrice };
        }
        return food;
      });
      return arr;
    }

    default:
      console.log("Error in reducer");
      return state;
  }
};

      


export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return(
        <cartdispatchcontext.Provider value={dispatch}>
            <cartstatecontext.Provider value={state}>
           {
            children
           }     
            </cartstatecontext.Provider>
        </cartdispatchcontext.Provider>

    )
}
 export const usecart=()=>useContext(cartstatecontext);
 export const usedispatchcart=()=>useContext(cartdispatchcontext);
