import { brandReducer } from "@/reducers/brandReducer";
import { modelReducer } from "@/reducers/modelReducer";
import { tarifReducer } from "@/reducers/tarifReducer";
import { SetBrandAction, tBrand } from "@/types";
import { ActionWithPayload } from "@/types/redux";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  brand: brandReducer,
  tarif: tarifReducer,
  model: modelReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

// console.log(store.getState());

export default store;
