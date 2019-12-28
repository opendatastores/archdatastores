import { IDataConnector } from "archdatacore";
import { IDataConnectorConfig } from "./IDataConnectorConfig";

export interface IDataConfigs {
  [name: string]: {
    connector: string | IDataConnector;
    config: IDataConnectorConfig;
  };
}
