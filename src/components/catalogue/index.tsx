"use client";

import React, { useEffect } from "react";
import CatalogueItem from "../catalogueItem";
import { iCatalogue } from "@/types";

const Catalogue = ({ catalogue }: { catalogue: iCatalogue }) => {
  useEffect(() => {}, []);

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
