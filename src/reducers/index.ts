import { initialState__brand, initialState__model, initialState__tariff } from "@/containers/CatalogueContainer";
import { setBrand, setModel, setTarif } from "@/utils/actions";

export const tariffReducer = (
  state = initialState__tariff,
  action: ReturnType<typeof setTarif>,
) => {
  switch (action.type) {
    case "SET_TARIF":
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    default:
      return state;
  }
};

export type tTariffReducer = typeof tariffReducer;

export const modelNameReducer = (
  state = initialState__model,
  action: ReturnType<typeof setModel>,
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

export type tModelNameReducer = typeof modelNameReducer;

export const brandReducer = (
  state = initialState__brand,
  action: ReturnType<typeof setBrand>,
) => {
  switch (action.type) {
    case "SET_BRAND":
      return {
        ...state,
        value: [...state.value, ...action.payload],
      };
    default:
      return state;
  }
};

export type tBrandReducer = typeof brandReducer;