import {
  initialState__brand,
  initialState__model,
  initialState__tariff,
} from "@/containers/CatalogueContainer";
import {
  ActionCreator__setBrand,
  ActionCreator__setModel,
  ActionCreator__setTarif,
} from "@/utils/actions";

export const tariffReducer = (
  state = initialState__tariff,
  action: ReturnType<typeof ActionCreator__setTarif>,
) => {
  switch (action.type) {
    case "SET_TARIF":
      return {
        ...state,
        value: [/* ...state.value,  */...action.payload],
      };
    default:
      return state;
  }
};

export const modelNameReducer = (
  state = initialState__model,
  action: ReturnType<typeof ActionCreator__setModel>,
) => {
  switch (action.type) {
    case "SET_MODEL":
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    default:
      return state;
  }
};

export const brandReducer = (
  state = initialState__brand,
  action: ReturnType<typeof ActionCreator__setBrand>,
) => {
  switch (action.type) {
    case "SET_BRAND":
      return {
        ...state,
        value: [...action.payload],
      };
    default:
      return state;
  }
};

export type tTariffReducer = typeof tariffReducer;
export type tModelNameReducer = typeof modelNameReducer;
export type tBrandReducer = typeof brandReducer;
