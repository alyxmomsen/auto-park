import {
  BrandState,
  CatalogCtx,
  ModelNameState,
  TarifState,
} from "@/containers/CatalogueContainer";
import { tBrandReducer, tModelNameReducer, tTariffReducer } from "@/reducers";
import { useContext, useEffect, useReducer } from "react";

export function myHandler({
  brands = [],
  tariffes = [],
  models = [],
}: {
  brands: string[];
  models?: string[];
  tariffes?: string[];
}) {
  const brandParamsString = fn(brands, "brand");
  const tariffParamsString = fn(brands, "tarif");
  const modelParamsString = fn(brands, "model");

  return {
    brandParamsString,
    tariffParamsString,
    modelParamsString,
  };
}

function fn(arr: string[], paramType: "brand" | "tarif" | "model") {
  const brandInitValue = "";
  const params__brand = arr.reduce((accumulator, currentValue) => {
    const str = `&${paramType}\\[\\]=` + currentValue;
    const regexp = new RegExp(str, "gi");
    const testResult = regexp.test(accumulator);

    return accumulator + (!testResult ? `&${paramType}[]=` + currentValue : "");
  }, brandInitValue);

  return params__brand;
}

export function useReducers({
  modelNameReducer,
  initialState__model,
  brandReducer,
  initialState__brand,
  tariffReducer,
  initialState__tariff,
}: {
  modelNameReducer: tModelNameReducer;
  initialState__model: ModelNameState;
  brandReducer: tBrandReducer;
  initialState__brand: BrandState;
  tariffReducer: tTariffReducer;
  initialState__tariff: TarifState;
}) {
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
