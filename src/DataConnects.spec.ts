import { expect } from "chai";
import { DataConnects } from "./DataConnects";

describe("DataConnects.ts tests", () => {
  afterEach(() => DataConnects.reset());

  describe("#DataConnects.set()", () => {
    it("expect to set the data connect", () => {
      // arranges
      const values: any = {
        dataConnect: {},
      };

      // acts
      const act = () => DataConnects.set("test", values);

      // asserts
      expect(act).not.to.throw(Error);
    });

    it("expect to set the data connect with options", () => {
      // arranges
      const values: any = {
        dataConnect: {},
        options: {},
      };

      // acts
      const act = () => DataConnects.set("test", values);

      // asserts
      expect(act).not.to.throw(Error);
    });
  });
});
