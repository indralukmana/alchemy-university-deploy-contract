import { ethers } from "hardhat";

async function main() {
  const winnerContract = await ethers.getContractAt(
    "Winner",
    "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"
  );

  const tx = await winnerContract.attempt();

  console.log("tx hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
