import { expect, assert } from "chai";
import hre from "hardhat";

describe("ModifyVariable", () => {
  it("should modify a variable", async () => {
    const ModifyVariable = await hre.ethers.getContractFactory(
      "ModifyVariable"
    );
    const modifyVariable = await ModifyVariable.deploy(77);

    await modifyVariable.waitForDeployment();

    const value = await modifyVariable.value();
    expect(value).to.equal(77);
  });

  it("should modify a variable to leet", async () => {
    const ModifyVariable = await hre.ethers.getContractFactory(
      "ModifyVariable"
    );
    const modifyVariable = await ModifyVariable.deploy(77);

    await modifyVariable.waitForDeployment();

    let value = await modifyVariable.value();

    expect(value).to.equal(77);

    await modifyVariable.modifyToLeet();

    value = await modifyVariable.value();

    expect(value).to.equal(1337);
  });

  it("should modify a variable to zero", async () => {
    const ModifyVariable = await hre.ethers.getContractFactory(
      "ModifyVariable"
    );
    const modifyVariable = await ModifyVariable.deploy(77);

    await modifyVariable.waitForDeployment();

    let value = await modifyVariable.value();

    expect(value).to.equal(77);

    await modifyVariable.modifyToZero();

    value = await modifyVariable.value();

    expect(value).to.equal(0);
  });

  it("should modify a variable to one", async () => {
    const ModifyVariable = await hre.ethers.getContractFactory(
      "ModifyVariable"
    );
    const modifyVariable = await ModifyVariable.deploy(77);

    await modifyVariable.waitForDeployment();

    let value = await modifyVariable.value();

    expect(value).to.equal(77);

    await modifyVariable.modifyToOne();

    value = await modifyVariable.value();

    expect(value).to.equal(1);
  });

  it("should modify a variable with a new value", async () => {
    const ModifyVariable = await hre.ethers.getContractFactory(
      "ModifyVariable"
    );
    const modifyVariable = await ModifyVariable.deploy(77);

    await modifyVariable.waitForDeployment();

    let value = await modifyVariable.value();

    expect(value).to.equal(77);

    await modifyVariable.modifyValue(123123);

    value = await modifyVariable.value();

    expect(value).to.equal(123123);
  });
});
