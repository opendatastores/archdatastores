import { expect } from "chai";
import { DataConnects } from "./DataConnects";

describe("DataConnects.ts tests", () => {
  afterEach(() => DataConnects.reset());

  describe("#DataConnects.set()", () => {
    it("expect to set the data connect", () => {
      // arranges
      const connect: any = {};

      // acts
      const act = () => DataConnects.set("test", connect);

      // asserts
      expect(act).not.to.throw(Error);
    });
  });

  describe("#DataConnects.get()", () => {
    it("expect to get the data connect", () => {
      // arranges
      const name = "test";
      const connect: any = {};
      DataConnects.set(name, connect);

      // acts
      const result = DataConnects.get(name);

      // asserts
      expect(result).to.equal(connect);
    });

    it("expect to get undefined as the name not exist", () => {
      // arranges
      const name = "test";

      // acts
      const result = DataConnects.get(name);

      // asserts
      expect(result).to.equal(undefined);
    });

    it("expect to get false as the name not exist", () => {
      // arranges
      const name = "test";

      // acts
      const result = DataConnects.exist(name);

      // asserts
      expect(result).to.equal(false);
    });
  });
});
