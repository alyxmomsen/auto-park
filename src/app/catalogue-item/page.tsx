import React, { useReducer } from "react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const CatalogueItemRoute = () => {
  return redirect("/catalogue");
};

export default CatalogueItemRoute;
