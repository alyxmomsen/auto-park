"use client";

import Catalogue from "@/components/catalogue";
import Filter from "@/components/filter";
import { myHandler, useReducers } from "@/myHooks";
import { brandReducer, modelNameReducer, tariffReducer } from "@/reducers";

import {
  ActionType,
  iCatalogue,
  iFilter,
  iFilterItem__brand,
  iFilterItem__modelName,
  iFilterItem__tariff,
  iTarifModel,
} from "@/types";
import { setBrand, setModel, setTarif } from "@/utils/actions";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const initialState__brand: iFilterItem__brand = {
  name: "Марка",
  code: "brand",
  value: [],
};
export const initialState__model: iFilterItem__modelName = {
  name: "Модель",
  type: "model",
  value: [],
};
export const initialState__tariff: iFilterItem__tariff = {
  name: "Тариф",
  type: "tarif",
  value: [],
};

export const initialState: iFilter = {
  brands: initialState__brand,
  models: initialState__model,
  tariff: initialState__tariff,
};

// export const catalogueContext = createContext<{
//   catalogue: iCatalogue | null;
//   filter: iFilter;
//   filterDispatch: React.Dispatch<ReducerAction<ActionCreator>> | null;
// }>({ catalogue: null, filter: initialState, filterDispatch: null });

const tarif: iTarifModel = {
  "13": "Комфорт+",
  "14": "Комфорт",
  "22": "Комфорт2",
  "26": "Комфорт3",
};

const SET_TARIF: ActionType = "SET_TARIF";
const SET_MODEL: ActionType = "SET_MODEL";
const SET_BRAND: ActionType = "SET_BRAND";



interface iCatalogueRootState {}

export const CatalogCtx = createContext<{
  model: {
    filter__tariff: iFilterItem__tariff;
    filter_modelName: iFilterItem__modelName;
    filter_brand: iFilterItem__brand;
  };
  controller: {
    modelNameDispatch: React.Dispatch<ReducerAction<typeof setModel>> | null;
    brandDispatch: React.Dispatch<ReducerAction<typeof setBrand>> | null;
    tariffDispatch: React.Dispatch<ReducerAction<typeof setTarif>> | null;
  };
}>({
  model: {
    filter__tariff: initialState__tariff,
    filter_modelName: initialState__model,
    filter_brand: initialState__brand,
  },
  controller: {
    modelNameDispatch: null,
    brandDispatch: null,
    tariffDispatch: null,
  },
});



export type ReducerAction<T extends MultiActionCreator> = ReturnType<T>;
export type MultiActionCreator =
  | typeof setTarif
  | typeof setModel
  | typeof setBrand;

export type ModelNameState = typeof initialState__model;
export type TarifState = typeof initialState__tariff;
export type BrandState = typeof initialState__brand;

const CatalogContainer = () => {
  const [data, setData] = useState<iCatalogue | null>(null);

  const {
    model_brand,
    model_modelName,
    model_tariff,
    brandDispatch,
    modelNameDispatch,
    tariffDispatch,
  } = useReducers({
    brandReducer,
    modelNameReducer,
    tariffReducer,
    initialState__brand,
    initialState__model,
    initialState__tariff,
  });

  useEffect(() => {
    getCatalogByPageId("1").then((response) => {
      setData(response);
    });
  }, []);

  useEffect(() => {
    const { brandParamsString: bps } = myHandler({ brands: model_brand.value });
    console.log("param string changed", bps);
    getCatalogByPageId("2", bps).then((response) => {
      setData(response);
    });
  }, [model_brand]);

  useEffect(() => {

    getCatalogByPageId("1").then((response) => {
      setData(response);
    });
  }, [model_brand, model_tariff, model_modelName]);

  return (
    <div>
      <CatalogCtx.Provider
        value={{
          model: {
            filter__tariff: model_tariff,
            filter_brand: model_brand,
            filter_modelName: model_modelName,
          },
          controller: {
            brandDispatch,
            modelNameDispatch,
            tariffDispatch,
          },
        }}
      >
        <Filter />
        {data && <Catalogue catalogue={data} />}
      </CatalogCtx.Provider>
      <div>preloader</div>
    </div>
  );
};

export default CatalogContainer;

async function getCatalogByPageId(pageId: string, params: string = "") {
  const baseURL_catalog_cars =
    "https://test.taxivoshod.ru/api/test/?w=catalog-cars";

  try {
    const response = await axios.get<iCatalogue>(
      baseURL_catalog_cars + "&page=" + pageId + params,
    );
    const { data } = response;
    return data;
  } catch (err) {
    console.log({ err });
    return null;
  }
}
