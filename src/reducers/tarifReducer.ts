import { SetTarifAction, tTarif } from "@/types";

const initialState: {
  name: "Тариф";
  type: "tarif";
  value: tTarif | null;
} = {
  name: "Тариф",
  type: "tarif",
  value: null,
};

export const tarifReducer = (state = initialState, action: SetTarifAction) => {
  switch (action.type) {
    case "SET_TARIF":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
