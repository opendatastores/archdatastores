import { IDataConnect } from "archdatacore";

let INSTANCE: { [name: string]: IDataConnect; } = {};

export const DataConnects = {
  exist: (name: string) =>
    (INSTANCE[name] !== null && INSTANCE[name] !== undefined),
  get: (name: string) =>
    INSTANCE[name],
  reset: () => {
    INSTANCE = {};
  },
  set: (name: string, dataConnect: IDataConnect) => {
    INSTANCE[name] = dataConnect;
  },
};

Object.freeze(DataConnects);
