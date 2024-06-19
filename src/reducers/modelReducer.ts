import {
  SetBrandAction,
  SetModelAction,
  SetTarifAction,
  tVehicles,
} from "@/types";

const initialState: {
  name: "Модель";
  type: "model";
  value: tVehicles | null;
} = {
  name: "Модель",
  type: "model",
  value: null,
};

export const modelReducer = (state = initialState, action: SetModelAction) => {
  switch (action.type) {
    case "SET_MODEL":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
