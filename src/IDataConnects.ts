import { IDataConnect } from "archdatacore";

export interface IDataConnects {
  get: (name: string) => IDataConnect;
  set: (name: string, dataConnect: IDataConnect) => void;
}
