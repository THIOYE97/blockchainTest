const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote", () => {
  let Vote, vote, owner, address1, address2;

  beforeEach(async function () {
    Vote = await ethers.getContractFactory("Vote");
    vote = await Vote.deploy();

    [owner, address1, address2] = await ethers.getSigners();
  });

  it("Should vote currently", async function () {
    await vote.vote(1);
    const option = await vote.options(1);
    expect(option.voteCount).to.equal(1);
  });
  it("Shouldn't allow double voting", async function () {
    await vote.vote(1);
    expect(vote.vote(1)).to.be.revertedWith("Vous ne pouvez plus voter");
  });
  it("should initialise with correct options", async function () {
    const option0 = await vote.options(0);
    const option1 = await vote.options(1);
    const option2 = await vote.options(2);

    expect(option0.name).to.equal("Vote blanc");
    expect(option1.name).to.equal("Oui");
    expect(option2.name).to.equal("Non");

    expect(option0.voteCount).to.equal(0);
    expect(option1.voteCount).to.equal(0);
    expect(option2.voteCount).to.equal(0);
  });

  it("Shouldn't allow voting for non-existent option ", async function () {
    expect(vote.vote(5)).to.be.revertedWith("Cette options n'existe pas");
  });

  it("should allow different users to vote", async function () {
    await vote.vote(1);
    await vote.connect(address1).vote(2);
    await vote.connect(address2).vote(0);

    const option0 = await vote.options(0);
    const option1 = await vote.options(1);
    const option2 = await vote.options(2);

    expect(option0.voteCount).to.equal(1);
    expect(option1.voteCount).to.equal(1);
    expect(option2.voteCount).to.equal(1);
  });
});
