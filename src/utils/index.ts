import { iTarifModel, tTarifCode } from "@/types";

export function getTarifByCode(tarifModel:iTarifModel , code:tTarifCode) {
  return tarifModel[code];
}