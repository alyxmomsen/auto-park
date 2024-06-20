import {
  initialState__brand,
  initialState__model,
  initialState__tariff,
} from "@/containers/CatalogueContainer";
import { brandReducer, modelNameReducer, tariffReducer } from "@/reducers";
import { tBrand, tTarif, tVehicles } from "@/types";
import { useReducer } from "react";

export function myHandler({
  brands = [],
  tariffes = [],
  models = [],
}: {
  brands?: string[];
  models?: string[];
  tariffes?: tTarif[];
}) {
  const brandParamsString = fn(brands, "brand");
  const tariffParamsString = fn(tariffes.map(elem => elem.code), "tarif");
  const modelParamsString = fn(models, "model");

  return {
    brandParamsString,
    tariffParamsString,
    modelParamsString,
  };
}

function fn(arr: (string)[], paramType: "brand" | "tarif" | "model") {
  const brandInitValue = "";
  const params__brand = arr.reduce((accumulator, currentValue) => {
    const str = `&${paramType}\\[\\]=` + currentValue;
    const regexp = new RegExp(str, "gi");
    const testResult = regexp.test(accumulator);

    return accumulator + (!testResult ? `&${paramType}[]=` + currentValue : "");
  }, brandInitValue);

  return params__brand;
}

export function useReducers() {
  const [model_modelName, modelNameDispatch] = useReducer<
    typeof modelNameReducer
  >(modelNameReducer, initialState__model);

  const [model_brand, brandDispatch] = useReducer<typeof brandReducer>(
    brandReducer,
    initialState__brand,
  );

  const [model_tariff, tariffDispatch] = useReducer<typeof tariffReducer>(
    tariffReducer,
    initialState__tariff,
  );

  return {
    model_modelName,
    model_brand,
    model_tariff,
    modelNameDispatch,
    brandDispatch,
    tariffDispatch,
  };
}
