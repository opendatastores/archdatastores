import { DataConnector } from "archdatacore";

export interface IDataConfig<Config = any, Options = any> {
  config: Config;
  connector: string | DataConnector;
  options?: Options;
}
