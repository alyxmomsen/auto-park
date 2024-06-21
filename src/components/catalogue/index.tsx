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
  }, []);

  console.log({ catalogue });

  return (
    <div className="catalogue__root">
      <h1 className="catalogue__root__title">Catalogue</h1>
      <div className="catalogue__root pagination">
        pagination <span className="pagination__item">{catalogue.page}</span> of{" "}
        <span className="pagination__item">{catalogue.pages}</span> | per:{" "}
        <span className="pagination__item">{catalogue.per_page}</span>
      </div>
      <div className="catalogue_root__body">
        {catalogue.list.map((elem) => (
          <CatalogueItem key={elem.id} data={elem} />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
