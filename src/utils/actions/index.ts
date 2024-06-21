import {
  SetBrandAction,
  SetModelAction,
  SetTarifAction,
  tAllModels,
  tBrand,
  tTarif,
  tVehicles,
} from "@/types";

export const ActionCreator__setTarif = (tariff: tTarif[]): SetTarifAction => {
  return {
    type: "SET_TARIF",
    payload: tariff,
  };
};

export const ActionCreator__setModel = (model: tAllModels[]): SetModelAction => {
  return {
    type: "SET_MODEL",
    payload: model,
  };
};

export const ActionCreator__setBrand = (brand: tBrand[]): SetBrandAction => {
  return {
    type: "SET_BRAND",
    payload: brand,
  };
};
