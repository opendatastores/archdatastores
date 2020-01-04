import { createConnect } from "./core/createConnect";
import { DataConnects } from "./DataConnects";
import { IDataConfigs } from "./IDataConfigs";
import { IDataConnects } from "./IDataConnects";

export const initialize = (dataConfigs: IDataConfigs, connects: IDataConnects = DataConnects) => {
  const keys = Object.keys(dataConfigs);

  for (const key of keys) {
    const { connector, config } = dataConfigs[key];
    const connect = createConnect(connector, config);

    connects.set(key, connect);
  }
};
