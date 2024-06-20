import { setBrand, setModel, setTarif } from "@/containers/CatalogueContainer";
import { getTarifByCode } from "@/utils";

export type tFilterDispatch = React.Dispatch<{
  type: ActionType;
  payload: ReducerAction<ActionCreator>;
}>;

export type ActionType = "SET_TARIF" | "SET_MODEL" | "SET_BRAND";

export type Action<T> = {
  type: ActionType;
  payload: tTarif | tBrand | tVehicles;
};

export type SetTarifAction = {
  type: "SET_TARIF";
  payload: tTarif;
};
export type SetModelAction = {
  type: "SET_MODEL";
  payload: tVehicles;
};
export type SetBrandAction = {
  type: "SET_BRAND";
  payload: tBrand[];
};

export interface iFilterItem__brand {
  name: "Марка";
  code: "brand";
  value: tBrand[];
}
export interface iFilterItem__modelName {
  name: "Модель";
  type: "model";
  value: tVehicles[];
}
export interface iFilterItem__tariff {
  name: "Тариф";
  type: "tarif";
  value: tTarif[];
}

export interface iFilter {
  brands: iFilterItem__brand;
  models: iFilterItem__modelName;
  tariff: iFilterItem__tariff;
}

export interface iTarifModel {
  "13": "Комфорт+";
  "14": "Комфорт";
  "22": "Комфорт2";
  "26": "Комфорт3";
}

export type tTarifCode = "13" | "14" | "22" | "26";

export type tTarif13 = { code: "13"; name: "Комфорт+" };
export type tTarif14 = { code: "14"; name: "Комфорт" };
export type tTarif22 = { code: "22"; name: "Комфорт2" };
export type tTarif26 = { code: "26"; name: "Комфорт3" };

export type tTarif = tTarif13 | tTarif14 | tTarif22 | tTarif26;

// export type iTariff

export type tBrand =
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

export type ReducerAction<T extends ActionCreator> = ReturnType<T>;
export type ActionCreator = typeof setTarif | typeof setModel | typeof setBrand;
