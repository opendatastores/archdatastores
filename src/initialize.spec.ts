import { expect } from "chai";
import * as mockRequire from "mock-require";
import * as sinon from "sinon";
import { DataConnects } from "./DataConnects";
import { IDataConnects } from "./IDataConnects";
import { initialize } from "./initialize";

describe("initialize.ts tests", () => {
  describe("#initialize()", () => {
    afterEach(() => DataConnects.reset());

    after(() => {
      mockRequire.stop("test");
      mockRequire.stop("archdatatest");
    });

    it("expect to initialize the library with function connector", () => {
      // arranges
      const config = {};
      const connector = sinon.spy();
      const dataConfig: any = {
        test: {
          config,
          connector,
        },
      };

      // acts
      initialize(dataConfig);

      // asserts
      expect(connector.calledWith(config)).to.equal(true);
    });

    it("expect to initialize the library with named connector", () => {
      // arranges
      const spyMock = sinon.spy();
      mockRequire("test", spyMock);
      const config = {};
      const connector = "test";
      const dataConfig: any = {
        test: {
          config,
          connector,
        },
      };

      // acts
      initialize(dataConfig);

      // asserts
      expect(spyMock.calledWith(config)).to.equal(true);
    });

    it("expect to initialize the library with shorten-named connector", () => {
      // arranges
      const spyMock = sinon.spy();
      mockRequire("archdatatest", spyMock);
      const config = {};
      const connector = "#test";
      const dataConfig: any = {
        test: {
          config,
          connector,
        },
      };

      // acts
      initialize(dataConfig);

      // asserts
      expect(spyMock.calledWith(config)).to.equal(true);
    });

    it("expect to initialize configs", () => {
      // arranges
      const map: any = {};
      const connectors: IDataConnects = {
        get: (name) => map[name],
        set: (name, dataConnect) => map[name] = dataConnect,
      };

      const target1 = {};
      const dataConfig1: any = {
        test1: {
          config: {},
          connector: () => target1,
        },
      };

      const target2 = {};
      const dataConfig2: any = {
        test2: {
          config: {},
          connector: () => target2,
        },
      };

      // acts
      initialize(dataConfig1, connectors);
      initialize(dataConfig2, connectors);

      // asserts
      expect(connectors.get("test1")).to.equal(target1);
      expect(connectors.get("test2")).to.equal(target2);
      expect(map.test1).to.equal(target1);
      expect(map.test2).to.equal(target2);
    });
  });
});
