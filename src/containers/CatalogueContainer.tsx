"use client";

import Catalogue from "@/components/catalogue";
import Filter from "@/components/filter";
import { myHandler } from "@/myHooks";
import store from "@/store";
import {
  ActionType,
  iCatalogue,
  iFilter,
  iFilterItem__brand,
  iFilterItem__modelName,
  iFilterItem__tariff,
  iTarifModel,
  SetBrandAction,
  SetModelAction,
  SetTarifAction,
  tBrand,
  tFilterDispatch,
  tTarif,
  tTarifCode,
  tVehicles,
} from "@/types";
import axios from "axios";
import { Coming_Soon } from "next/font/google";
import { redirect } from "next/navigation";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { Provider, useDispatch } from "react-redux";

const initialState__brand: iFilterItem__brand = {
  name: "Марка",
  code: "brand",
  value: [],
};
const initialState__model: iFilterItem__modelName = {
  name: "Модель",
  type: "model",
  value: [],
};
const initialState__tariff: iFilterItem__tariff = {
  name: "Тариф",
  type: "tarif",
  value: [],
};

const initialState: iFilter = {
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

export const setTarif = (tariff: tTarif): SetTarifAction => {
  return {
    type: "SET_TARIF",
    payload: tariff,
  };
};

export const setModel = (model: tVehicles): SetModelAction => {
  return {
    type: "SET_MODEL",
    payload: model,
  };
};

export const setBrand = (brand: tBrand[]): SetBrandAction => {
  return {
    type: "SET_BRAND",
    payload: brand,
  };
};

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

const tariffReducer = (
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
const modelNameReducer = (
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
const brandReducer = (
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

export type ReducerAction<T extends MultiActionCreator> = ReturnType<T>;
export type MultiActionCreator =
  | typeof setTarif
  | typeof setModel
  | typeof setBrand;

type ModelNameState = typeof initialState__model;
type TarifState = typeof initialState__tariff;
type BrandState = typeof initialState__brand;

const CatalogContainer = () => {
  const [data, setData] = useState<iCatalogue | null>(null);

  const [localstorage, setLocalStorage] = useState<{}>({});

  const [model_modelName, modelNameDispatch] = useReducer<
    typeof modelNameReducer
  >(modelNameReducer, initialState__model);

  const [model_brand, brandDispatch] = useReducer<typeof brandReducer>(
    brandReducer,
    initialState__brand,
  );
  const [model_tariff, tariffDispatch] = useReducer<typeof tariffReducer>(
    tariffReducer,
    initialState__tariff,
  );

  useEffect(() => {
    getCatalogByPageId("1").then((response) => {
      setData(response);
    });
  }, []);

  
  useEffect(() => {
    const { brandParamsString:bps } = myHandler({brands:model_brand.value});
    console.log('param string changed' , bps);
    getCatalogByPageId("2" , bps).then((response) => {
      setData(response);
    });
  } , [model_brand]);

  useEffect(() => {
    // console.log({ model_brand, model_tariff, model_modelName });

    const brands = [];
    const models = [];
    const tarifs = [];

    const modelInitValue = "";
    const params__models = model_modelName.value.reduce(
      (accumulator, currentValue) => {
        const str = "&model\\[\\]=" + currentValue.models;
        const regexp = new RegExp(str, "gi");
        const testResult = regexp.test(accumulator);

        console.log({ accumulator, result: testResult });
        return (
          accumulator +
          (!testResult ? "&model[]=" + currentValue["models"] : "")
        );
      },
      modelInitValue,
    );

    getCatalogByPageId("1").then((response) => {
      setData(response);
    });
  }, [model_brand, model_tariff, model_modelName]);

  useEffect(() => {}, [data]);

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
