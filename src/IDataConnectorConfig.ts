export interface IDataConnectorConfig {
  connection?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  [key: string]: any;
}
