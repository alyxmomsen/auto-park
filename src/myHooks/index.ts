import { CatalogCtx } from "@/containers/CatalogueContainer";
import { useContext, useEffect } from "react";

export function myHandler({ brands = [], tariffes = [], models = [] }: { brands: string[]; models?: string[]; tariffes?:string[]}) {

    const brandParamsString = fn(brands, "brand");
    const tariffParamsString = fn(brands, "tarif");
    const modelParamsString = fn(brands, "model");
    
    return {
        brandParamsString,
        tariffParamsString,
        modelParamsString,
    }
}

function fn(arr: string[], paramType: "brand"|"tarif"|"model") {
  const brandInitValue = "";
  const params__brand = arr.reduce((accumulator, currentValue) => {
    const str = `&${paramType}\\[\\]=` + currentValue;
    const regexp = new RegExp(str, "gi");
    const testResult = regexp.test(accumulator);

    return accumulator + (!testResult ? `&${paramType}[]=` + currentValue : "");
  }, brandInitValue);

  return params__brand;
}
