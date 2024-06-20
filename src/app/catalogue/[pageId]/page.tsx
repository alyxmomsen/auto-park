import React from "react";

const CataloguePage = ({ params }: { params: { pageId: string } }) => {
  console.log(params.pageId);

  return <div>item</div>;
};

export default CataloguePage;
