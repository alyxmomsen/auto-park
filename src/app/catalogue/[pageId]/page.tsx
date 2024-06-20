import CatalogueItem, { CatalogItemProps } from "@/components/catalogueItem";
import React from "react";

const data: CatalogItemProps = {
  id: "sdfadfafd",
  brand: "asdfadsfa",
  image: "asdfasdf",
  model: "adsfasdf",
  number: "adsfasdasdadf",
  price: 9862654,
};

const CataloguePage = ({ params }: { params: { pageId: string } }) => {
  console.log(params.pageId);

  return <div>item</div>;
};

export default CataloguePage;
