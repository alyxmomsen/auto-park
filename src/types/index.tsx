import { getTarifByCode } from "@/utils";

export type tFilterDispatch = React.Dispatch<{
  type: ActionType;
  payload: tTarif | tBrands | tVehicles;
}>;

export type ActionType = "SET_TARIF" | "SET_MODEL" | "SET_BRAND";

export type Action<T> = {
    type: ActionType;
    payload:tTarif | tBrands | tVehicles
}

export type SetTarifAction = {
    type: "SET_TARIF";
    payload: tTarif;
}
export type SetModelAction = {
    type: "SET_MODEL";
    payload: tVehicles;
}
export type SetBrandAction = {
    type: "SET_BRAND";
    payload: tBrands;
}

export interface iFilter {
  brands: {
    name: "Марка";
    code: "brand";
    value: tBrands | null;
  };
  models: {
    name: "Модель";
    type: "model";
    value: tVehicles | null;
  };
  tarif: {
    name: "Тариф";
      type: "tarif";
      tarifCode: tTarifCode|null;
      tarifName: tTarifName|null;
        value: tTarif | null;
  };
}

export interface iTarifModel {
    "13": "Комфорт+",
    "14": "Комфорт",
    "22": "Комфорт2",
    "26": "Комфорт3"
}

export type tTarifCode = "13" | "14" | "22" | "26";
export type tTarifName = ReturnType<typeof getTarifByCode>;

export type tTarif =
  | { "13": "Комфорт+" }
  | { "14": "Комфорт" }
  | { "22": "Комфорт2" }
  | { "26": "Комфорт3" };

export type tBrands =
  | "BMW"
  | "Chery"
  | "EXEED"
  | "Geely"
  | "Hyundai"
  | "Kia"
  | "Renault"
  | "Toyota";

export type tBMW_models = "X2" | "X5";

export type tChery_models =
  | "Arrizo 8"
  | "Tiggo 4"
  | "Tiggo 7 Pro"
  | "Tiggo 7 Pro Max"
  | "Tiggo 8 Pro Max";

export type tEXEED_models = "LX" | "TXL" | "VX";
export type tGeely_models = "Coolray";
export type tHyundai_models = "Sonata";
export type tKia_models = "K5" | "Optima" | "Rio";
export type tRenault_models = "Logan";
export type tToyota_models = "Camry";

export type tVehicles =
  | {
      brand: "BMW";
      models: tBMW_models;
    }
  | {
      brand: "Chery";
      models: tChery_models;
    }
  | {
      brand: "EXEED";
      models: tEXEED_models;
    }
  | {
      brand: "Geely";
      models: tGeely_models;
    }
  | {
      brand: "Hyundai";
      models: tHyundai_models;
    }
  | {
      brand: "Kia";
      models: tKia_models;
    }
  | {
      brand: "Renault";
      models: tRenault_models;
    }
  | {
      brand: "Toyota";
      models: tToyota_models;
    };

export interface iCatalogue {
  result: number;
  page: number;
  pages: number;
  per_page: number;
  list: iCatalogueItem[];
}

export interface iCatalogueItem {
  id: string;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string;
  tarif: string[];
}