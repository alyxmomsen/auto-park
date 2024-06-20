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
      brandDispatch({type:"SET_BRAND" , payload:"Hyundai"});
    }
    if (tariffDispatch) {
      tariffDispatch({ type: "SET_TARIF", payload: {code:"14" , name:"Комфорт"} });
    }
    if (modelNameDispatch) {
      modelNameDispatch({ type:"SET_MODEL", payload: { models: 'Camry', brand: 'Toyota' } });
    }

  }, []);

  console.log({catalogue});

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
