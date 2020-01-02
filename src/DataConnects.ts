import { IDataConnect, IDataContext } from "archdatacore";

let INSTANCE: { [name: string]: IDataConnect; } = {};

export const DataConnects = {
  exist: (name: string) =>
    (INSTANCE[name] !== null && INSTANCE[name] !== undefined),
  get: (name: string) =>
    INSTANCE[name],
  reset: () => {
    INSTANCE = {};
  },
  set: (name: string, dataConnect: () => IDataContext) => {
    INSTANCE[name] = dataConnect;
  },
};

Object.freeze(DataConnects);
