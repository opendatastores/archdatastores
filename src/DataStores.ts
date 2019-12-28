import { IDataContext } from "archdatacore";
import { createConnect } from "./core/createConnect";
import { DataConnects } from "./DataConnects";
import { IDataConfig } from "./IDataConfig";
import { IDataConnectorConfig } from "./IDataConnectorConfig";
import { IDataConnects } from "./IDataConnects";

let INSTANCE: { [name: string]: any; } = {};

export const DataStores = {
  register: <Config = IDataConnectorConfig>(
    name: string,
    dataConfig: IDataConfig<Config>,
    dataConnects?: IDataConnects,
  ) => {
    const Connects = dataConnects || DataConnects;
    const { config, connector } = dataConfig;
    const connect = createConnect(connector, config);
    Connects.set(name, connect);
  },
  reset: () => {
    INSTANCE = {};
  },
  resolve: <DataContext extends IDataContext>(
    name: string,
    options?: any,
    dataConnects?: IDataConnects,
  ): DataContext => {
    if (INSTANCE[name] === undefined) {
      const Connects = dataConnects || DataConnects;
      const connect = Connects.get(name);

      if (connect === undefined) {
        throw new Error(`UNDEFINED_DATASTORE - name: ${name}`);
      }

      if (typeof connect !== "function") {
        throw new Error(`INVALID_DATA_CONNECT - name: ${name} - should be a function`);
      }

      INSTANCE[name] = connect(options);
    }

    return INSTANCE[name];
  },
};

Object.freeze(DataStores);
