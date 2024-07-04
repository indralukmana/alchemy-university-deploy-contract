import { ContractFactory, JsonRpcProvider, Wallet } from "ethers";
import "dotenv/config";
import { artifacts } from "hardhat";

async function main() {
  const url = process.env.SEPOLIA_URL;
  const faucetArtifact = await artifacts.readArtifact("Faucet");
  const provider = new JsonRpcProvider(url);
  const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);

  const factory = new ContractFactory(
    faucetArtifact.abi,
    faucetArtifact.bytecode,
    wallet
  );

  try {
    const faucetDeployment = await factory.deploy();

    const faucet = await faucetDeployment.waitForDeployment();

    const address = await faucet.getAddress();

    console.log("Faucet deployed to:", address);
  } catch (error) {
    console.error("Error deploying Faucet:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
