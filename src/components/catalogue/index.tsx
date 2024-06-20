"use client";

import React, { useContext, useEffect } from "react";
import CatalogueItem from "../catalogueItem";
import { iCatalogue } from "@/types";
import { CatalogCtx } from "@/containers/CatalogueContainer";

const Catalogue = ({ catalogue }: { catalogue: iCatalogue }) => {
  const ctx = useContext(CatalogCtx);

  useEffect(() => {
    const { modelNameDispatch } = ctx.controller;
    const { brandDispatch } = ctx.controller;
    const { tariffDispatch } = ctx.controller;

    if (brandDispatch) {
      // brandDispatch({type:"SET_BRAND" , payload:"Hyundai"});
      brandDispatch({ type: "SET_BRAND", payload: "BMW" });
      // brandDispatch({type:"SET_BRAND" , payload:"Chery"});
    }

    // if (tariffDispatch) {
    //   tariffDispatch({ type: "SET_TARIF", payload: {code:"14" , name:"Комфорт"} });
    //   tariffDispatch({ type: "SET_TARIF", payload: {code:"22" , name:"Комфорт2"} });
    //   tariffDispatch({ type: "SET_TARIF", payload: {code:"26" , name:"Комфорт3"} });
    // }

    if (modelNameDispatch) {
      // modelNameDispatch({ type:"SET_MODEL", payload: { models: 'Camry', brand: 'Toyota' } });
      modelNameDispatch({
        type: "SET_MODEL",
        payload: { brand: "BMW", models: "X5" },
      });
      // modelNameDispatch({ type:"SET_MODEL", payload: { models: 'K5', brand: 'Kia' } });
    }
  }, []);

  console.log({ catalogue });

  return (
    <div>
      <h1>Catalogue</h1>
      <div>
        pagination {catalogue.page} of {catalogue.pages}
      </div>
      {catalogue.list.map((elem) => (
        <CatalogueItem key={elem.id} data={elem} />
      ))}
    </div>
  );
};

export default Catalogue;
