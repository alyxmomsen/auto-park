"use client";

import Catalogue from "@/components/catalogue";
import Filter from "@/components/filter";
import store from "@/store";
import {
  ActionCreator,
  ActionType,
  iCatalogue,
  iFilter,
  iTarifModel,
  ReducerAction,
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
import { redirect } from "next/navigation";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { Provider } from "react-redux";

const initialState: iFilter = {
  brands: {
    name: "Марка",
    code: "brand",
    value: null,
  },
  models: {
    name: "Модель",
    type: "model",
    value: null,
  },
  tarif: {
    name: "Тариф",
    type: "tarif",
    value: null,
  },
};

export const catalogueContext = createContext<{
  catalogue: iCatalogue | null;
  filter: iFilter;
  filterDispatch: React.Dispatch<ReducerAction<ActionCreator>> | null;
}>({ catalogue: null, filter: initialState, filterDispatch: null });

const tarif: iTarifModel = {
  "13": "Комфорт+",
  "14": "Комфорт",
  "22": "Комфорт2",
  "26": "Комфорт3",
};

const SET_TARIF: ActionType = "SET_TARIF";
const SET_MODEL: ActionType = "SET_MODEL";
const SET_BRAND: ActionType = "SET_BRAND";

export const setTarif = (tarif: tTarif): SetTarifAction => {
  return {
    type: "SET_TARIF",
    payload: tarif,
  };
};

export const setModel = (model: tVehicles): SetModelAction => {
  return {
    type: "SET_MODEL",
    payload: model,
  };
};

export const setBrand = (brand: tBrand): SetBrandAction => {
  return {
    type: "SET_BRAND",
    payload: brand,
  };
};

const CatalogContainer = () => {
  const [data, setData] = useState<iCatalogue | null>(null);

  useEffect(() => {
    getCatalogByPageId("2")
      .then((response) => {
        setData(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Filter />
        {data && <Catalogue catalogue={data} />}
      </Provider>
      <div>preloader</div>
    </div>
  );
};

export default CatalogContainer;

async function getCatalogByPageId(pageId: string) {
  try {
    const response = await axios.get<iCatalogue>(
      "https://test.taxivoshod.ru/api/test/?w=catalog-cars&page=" + pageId,
    );
    const { data } = response;
    return data;
  } catch (err) {
    console.log({ err });
    return null;
  }
}
