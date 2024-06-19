"use client";

import Catalogue from "@/components/catalogue";
import Filter from "@/components/filter";
import {
  ActionType,
  iCatalogue,
  iFilter,
  iTarifModel,
  tBrands,
  tFilterDispatch,
  tTarif,
  tTarifCode,
  tVehicles,
} from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { createContext, useEffect, useReducer, useState } from "react";

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
    tarifCode: null,
    tarifName:null, 
    value: null,
  },
};



export const catalogueContext = createContext<{
  catalogue: iCatalogue | null;
  filter: iFilter;
  filterDispatch: tFilterDispatch | null;
}>({ catalogue: null, filter: initialState, filterDispatch: null });

const tarif:iTarifModel = {
  "13": "Комфорт+",
  "14": "Комфорт",
  "22": "Комфорт2",
  "26": "Комфорт3",
};

const SET_TARIF: ActionType = "SET_TARIF";
const SET_MODEL: ActionType = "SET_MODEL";
const SET_BRAND: ActionType = "SET_BRAND";

const setTarif = (tarifCode:tTarifCode) => {
  return {
    type: "SET_TARIF",
    payload: tarifCode,
  };
};


const actionCreator =  () => {
  return 
}

const reducer = (
  state: iFilter,
  action: { type: ActionType; payload: tTarif | tBrands | tVehicles },
) => {
  switch (action.type) {
    case SET_TARIF:

      const payload = action.payload;
      
      return {
        ...state,
      };
    case SET_MODEL:
      return {...state};
    case SET_BRAND:
      return {...state};
    default:
      return state;
  }
};

const CatalogContainer = () => {
  const [data, setData] = useState<iCatalogue | null>(null);

  const [filterState, dispatch] = useReducer<
    (
      state: iFilter,
      action: {
        type: ActionType;
        payload: tTarif | tBrands | tVehicles;
      },
    ) => iFilter
  >(reducer, initialState);

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
      <catalogueContext.Provider
        value={{
          catalogue: data,
          filter: filterState,
          filterDispatch: dispatch,
        }}
      >
        <Filter />
        {data && <Catalogue catalogue={data} />}
      </catalogueContext.Provider>
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


