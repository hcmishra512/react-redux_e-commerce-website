// ADD ITEMS
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};
//REMOVE ITEMS
export const REMOVE = (id) => {
  return {
    type: "REMOVE_CART",
    payload: id,
  };
};

//Remove Indivisua Item one by one

export const REMOVE_ONE = (item) => {
  return {
    type: "REMOVE_CART_ONE",
    payload: item,
  };
};
