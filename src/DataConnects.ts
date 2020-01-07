import { IDataConnect } from "archdatacore";

let INSTANCE: {
  [name: string]: {
    dataConnect: IDataConnect;
    options?: any;
  };
} = {};

export const DataConnects = {
  exist: (name: string) =>
    (INSTANCE[name] !== null && INSTANCE[name] !== undefined),
  get: (name: string) =>
    INSTANCE[name],
  reset: (name?: string) => {
    if (name) {
      delete INSTANCE[name];
    } else {
      INSTANCE = {};
    }
  },
  set: (name: string, values: { dataConnect: IDataConnect; options?: any; }) => {
    INSTANCE[name] = {
      dataConnect: values.dataConnect,
      options: values.options,
    };
  },
};

Object.freeze(DataConnects);
