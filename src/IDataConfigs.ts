import { DataConnector } from "archdatacore";

export interface IDataConfigs {
  [name: string]: {
    connector: string | DataConnector;
    config: any;
    options?: any;
  };
}
