import { IDataConnect, IDataContext } from "archdatacore";
import { isNullOrUndefined } from "util";

let INSTANCE: { [name: string]: IDataConnect; } = {};

export const DataConnects = {
  exist: (name: string) =>
    !isNullOrUndefined(INSTANCE[name]),
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
