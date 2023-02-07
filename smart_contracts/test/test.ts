import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Upgradeable token", function () {
  async function dep() {
    const [deployer, evilUser, goodUser] = await ethers.getSigners();

    const StablecoinFactory = await ethers.getContractFactory("Hacienda")
    const token = await upgrades.deployProxy(StablecoinFactory, [], {
      initializer: 'initialize',

    });
    await token.deployed();

    return {token, deployer, evilUser, goodUser}
  }

  it('Test 1', async function () {
    const {token, deployer} = await loadFixture(dep)


    expect(await token.totalSupply()).to.not.eq(0)
    expect(await token.totalSupply()).to.eq(await token.balanceOf(deployer.address))
  })

  it('Test 2 (upgrade)', async function () {
    const {token, deployer} = await loadFixture(dep)

    const StablecoinFactoryV2 = await ethers.getContractFactory("HaciendaV2")
    const token2 = await upgrades.upgradeProxy(token.address, StablecoinFactoryV2);

    const mintAmount = 100000
    const oldBalance = await token2.balanceOf(deployer.address)

    const mintTx = await token2.mint(deployer.address, mintAmount);
    await mintTx.wait()


    expect(await token2.balanceOf(deployer.address)).to.eq(BigInt(oldBalance) + BigInt(mintAmount));
    console.log(await token.totalSupply())
  })

  it("Test 3", async function () {
    const {token, deployer, goodUser, evilUser} = await loadFixture(dep)

    await expect(
      token.transfer(goodUser.address, 100)
    ).to.changeTokenBalances(token, [deployer, goodUser], [-100, 100]);

    await expect(
      token.connect(goodUser).transfer(evilUser.address, 100)
    ).to.changeTokenBalances(token, [goodUser, evilUser], [-100, 100]);
  });


});
