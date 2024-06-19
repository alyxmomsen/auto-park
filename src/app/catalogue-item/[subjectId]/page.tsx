import React from "react";

const CatalogueItemById = ({ params }: { params: { subjectId: string } }) => {
  console.log({ subjectId: params.subjectId });
  return <div>{params.subjectId}</div>;
};

export default CatalogueItemById;
