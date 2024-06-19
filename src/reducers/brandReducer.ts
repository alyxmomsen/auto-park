import { SetBrandAction, tBrand } from "@/types";

const initialState: {
  name: "Марка";
  code: "brand";
  value: tBrand | null;
} = {
  name: "Марка",
  code: "brand",
  value: null,
};

export const setBrandAction = (brand: tBrand): SetBrandAction => {
  return {
    type: "SET_BRAND",
    payload: brand,
  };
};

export const brandReducer = (state = initialState, action: SetBrandAction) => {
  switch (action.type) {
    case "SET_BRAND":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
