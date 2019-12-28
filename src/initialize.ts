import { createConnect } from "./core/createConnect";
import { DataConnects } from "./DataConnects";
import { IDataConfigs } from "./IDataConfigs";
import { IDataConnects } from "./IDataConnects";

export const initialize = (dataConfigs: IDataConfigs, connects: IDataConnects = DataConnects) => {
  const names = Object.keys(dataConfigs);

  for (const name of names) {
    const { connector, config } = dataConfigs[name];
    const connect = createConnect(connector, config);

    connects.set(name, connect);
  }
};
