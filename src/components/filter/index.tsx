import { catalogueContext } from "@/containers/CatalogueContainer";
import React, { useContext } from "react";

const Filter = () => {
  const ctx = useContext(catalogueContext);

  console.log({ ctx });

  return (
    <div>
      <div>{ctx.filter.brands.value}</div>
          <div>{ctx.filter.models.value?.brand}</div>
          <div></div>
    </div>
  );
};

export default Filter;
