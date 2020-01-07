import { IDataConnect } from "archdatacore";

export interface IDataConnects {
  get: (name: string) => {
    dataConnect: IDataConnect;
    options?: any;
  };
  set: (name: string, values: { dataConnect: IDataConnect; options?: any; }) => void;
}
