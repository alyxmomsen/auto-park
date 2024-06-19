import CatalogContainer from "@/containers/CatalogueContainer";
import React from "react";

const CataloguePage = ({ params }: { params: { pageId: string } }) => {
  console.log(params.pageId);

  return <CatalogContainer />;
};

export default CataloguePage;
