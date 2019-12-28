import { expect } from "chai";
import * as sinon from "sinon";
import { DataConnects } from "./DataConnects";
import { DataStores } from "./DataStores";

describe("DataStores.ts tests", () => {
  describe("#DataStores.register()", () => {
    afterEach(() => {
      DataConnects.reset();
      DataStores.reset();
    });

    it("expect to register a data config", () => {
      // arranges
      const name = "test";
      const config = {};
      const connect = {};
      const connector = sinon.stub().callsFake(() => connect);

      // acts
      DataStores.register(name, { config, connector });

      // asserts
      expect(connector.calledOnceWith(config)).to.equal(true);
    });

    it("expect to register a data config with data connects", () => {
      // arranges
      const name = "test";
      const config = {};
      const connect = {};
      const connector = sinon.stub().callsFake(() => connect);
      const dataConnects = {
        set: sinon.spy(),
      };

      // acts
      DataStores.register(name, { config, connector }, dataConnects as any);

      // asserts
      expect(dataConnects.set.calledOnceWith(name, connect)).to.equal(true);
    });
  });

  describe("#DataStores.resolve()", () => {
    afterEach(() => {
      DataConnects.reset();
      DataStores.reset();
    });

    it("expect to resolve a data context", () => {
      // arranges
      const mockDataContext = {};
      const mockConnect = sinon.stub().callsFake(() => mockDataContext);
      DataConnects.set("test", mockConnect);

      // acts
      const result1 = DataStores.resolve("test");
      const result2 = DataStores.resolve("test");

      // asserts
      expect(result1).to.equal(mockDataContext);
      expect(result2).to.equal(mockDataContext);
      expect(mockConnect.callCount).to.equal(1);
    });

    it("expect to resolve a data context", () => {
      // arranges
      const mockDataContext = {};
      const mockConnect = () => mockDataContext;
      const mockConnects: any = {
        get: () => mockConnect,
      };

      // acts
      const result = DataStores.resolve("test", {}, mockConnects);

      // asserts
      expect(result).to.equal(mockDataContext);
    });

    it("expect to throw an Error if it's undefined", () => {
      // arranges

      // acts
      const act = () => DataStores.resolve("others");

      // asserts
      expect(act).to.throw(Error, "UNDEFINED_DATASTORE");
    });

    it("expect to throw an Error if it's an invalid data connect", () => {
      // arranges
      const mock: any = {};
      DataConnects.set("invalid", mock);

      // acts
      const act = () => DataStores.resolve("invalid");

      // asserts
      expect(act).to.throw(Error, "INVALID_DATA_CONNECT");
    });
  });
});
