import { createConnect } from "./core/createConnect";
import { DataConnects } from "./DataConnects";
import { IDataConfigs } from "./IDataConfigs";
import { IDataConnects } from "./IDataConnects";

export const initialize = (dataConfigs: IDataConfigs, connects: IDataConnects = DataConnects) => {
  const keys = Object.keys(dataConfigs);

  for (const key of keys) {
    const { config, connector, options } = dataConfigs[key];
    const dataConnect = createConnect(connector, config);

    connects.set(key, { dataConnect, options });
  }
};
