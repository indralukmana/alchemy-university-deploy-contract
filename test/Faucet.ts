import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const INITIAL_ETH_BALANCE = "10";

describe("Faucet", function () {
  // fixture to reuse between tests.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    const txDeployment = await faucet.waitForDeployment();

    // owner of the contract is the deployer.
    const [owner] = await ethers.getSigners();

    // address of the contract.
    const address = await faucet.getAddress();

    // Fund the contract with some Ether
    await owner.sendTransaction({
      to: address,
      value: ethers.parseEther(INITIAL_ETH_BALANCE), // sending 1 ETH
    });

    return { faucet, owner, address };
  }

  it("Should deploy and set the owner", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  // only less then .1 ETH
  it("Should not allow withdrawing more than .1 ETH", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    const [owner] = await ethers.getSigners();
    const amount = ethers.parseEther("1.1");

    await expect(faucet.connect(owner).withdraw(amount)).to.be.revertedWith(
      "Faucet: Cannot withdraw more than .1 ETH"
    );
  });

  it("Should allow withdrawing exactly .1 ETH", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    const [owner] = await ethers.getSigners();
    const amount = ethers.parseEther("0.1");
    // Capture the balance before transaction
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const tx = await faucet.connect(owner).withdraw(amount);
    const receipt = await tx.wait();

    // Check for null and throw an error if null
    if (!receipt?.gasUsed) {
      throw new Error("Gas used is null");
    }
    if (!tx.gasPrice) {
      throw new Error("Gas price is null");
    }

    // Calculate gas cost
    const gasUsed = receipt.gasUsed;
    const gasPrice = tx.gasPrice;
    const gasCost = gasUsed * gasPrice;

    // Capture the balance after transaction
    const finalBalance = await ethers.provider.getBalance(owner.address);

    // Expected balance after the transaction
    const expectedBalance = initialBalance + amount - gasCost;

    // Check that the final balance matches the expected balance
    expect(finalBalance).to.equal(expectedBalance);
  });

  it("Should allow withdrawing less than .1 ETH", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    const [owner] = await ethers.getSigners();
    const amount = ethers.parseEther("0.09");

    // Capture the balance before transaction
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const tx = await faucet.connect(owner).withdraw(amount);
    const receipt = await tx.wait();

    // Check for null and throw an error if null
    if (!receipt?.gasUsed) {
      throw new Error("Gas used is null");
    }
    if (!tx.gasPrice) {
      throw new Error("Gas price is null");
    }

    // Calculate gas cost
    const gasUsed = receipt.gasUsed;
    const gasPrice = tx.gasPrice;
    const gasCost = gasUsed * gasPrice;

    // Capture the balance after transaction
    const finalBalance = await ethers.provider.getBalance(owner.address);

    // Expected balance after the transaction
    const expectedBalance = initialBalance + amount - gasCost;

    // Check that the final balance matches the expected balance
    expect(finalBalance).to.equal(expectedBalance);
  });
});
