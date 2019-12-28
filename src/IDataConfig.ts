import { IDataConnector } from "archdatacore";
import { IDataConnectorConfig } from "./IDataConnectorConfig";

export interface IDataConfig<ConnectorConfig = IDataConnectorConfig> {
  connector: string | IDataConnector;
  config: ConnectorConfig;
}
