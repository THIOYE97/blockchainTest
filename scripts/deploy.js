const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Déploiement des contrats avec le compte:", deployer.address);
  const Vote = await hre.ethers.getContractFactory("Vote");
  const token = await Vote.deploy();

  // Attendre que le contrat soit déployé
  await token.deployed();

  // Attendre que la transaction de déploiement soit confirmée
  await token.deployTransaction.wait();

  console.log("Contrat déployé à l'adresse:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
