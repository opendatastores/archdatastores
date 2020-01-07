import { DataConnector } from "archdatacore";

export const createConnect = (
  connector: string | DataConnector,
  config: any,
) => {
  let Connector: DataConnector;

  if (typeof connector === "string") {
    const path = connector[0] === "#" ? `archdata${connector.substring(1)}` : connector;
    Connector = require(path);
  } else {
    Connector = connector;
  }

  const connect = Connector(config);

  return connect;
};

Object.freeze(createConnect);
