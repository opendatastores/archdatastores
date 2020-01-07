import { IDataConnect, IDataContext } from "archdatacore";
import { createConnect } from "./core/createConnect";
import { DataConnects } from "./DataConnects";
import { IDataConfig } from "./IDataConfig";
import { IDataConnects } from "./IDataConnects";

let INSTANCE: { [name: string]: any; } = {};

export const DataStores = {
  connect: (name: string): IDataConnect => {
    const Connects = DataConnects;
    const { dataConnect } = Connects.get(name);

    return dataConnect;
  },
  register: <Config = any, Options = any>(
    name: string,
    dataConfig: IDataConfig<Config, Options>,
    dataConnects?: IDataConnects,
  ) => {
    const Connects = dataConnects || DataConnects;
    const { config, connector, options } = dataConfig;
    const dataConnect = createConnect(connector, config);
    Connects.set(name, { dataConnect, options });
  },
  reset: (name?: string) => {
    if (name) {
      delete INSTANCE[name];
    } else {
      INSTANCE = {};
    }
  },
  resolve: async <DataContext extends IDataContext>(
    name: string,
    options?: any,
    dataConnects?: IDataConnects,
  ): Promise<DataContext> => {
    if (INSTANCE[name] === undefined) {
      const Connects = dataConnects || DataConnects;
      const { dataConnect: Connect, options: Options } = Connects.get(name);

      if (Connect === undefined) {
        throw new Error(`UNDEFINED_DATASTORE - name: ${name}`);
      } else if (typeof Connect.connect !== "function") {
        throw new Error(`INVALID_DATA_CONNECT - name: ${name} - must be a function`);
      } else {
        if (options === undefined) {
          INSTANCE[name] = await Connect.connect(Options);
        } else {
          INSTANCE[name] = await Connect.connect(options);
        }
      }
    }

    return INSTANCE[name];
  },
};

Object.freeze(DataStores);
