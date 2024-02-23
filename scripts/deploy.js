const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.deployContract("Vote");
  await token.waitForDeployment();

  console.log("Donations contract deployed at:", token.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
