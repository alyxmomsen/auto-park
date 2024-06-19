import { Action } from "redux";

export interface ActionWithPayload<P = any> extends Action {
  payload?: P;
}

export type SimpleActionCreator<P> = (params: P) => ActionWithPayload<P>;
