const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")
const {BigNumber} = require("ethers")

describe("Box Proxy V2", () => {
  let boxV2;
  beforeEach(async() => {
    const Box = await ethers.getContractFactory("Box")
    const BoxV2 = await ethers.getContractFactory("BoxV2")

    const box = await upgrades.deployProxy(Box, [42], {initializer: "store"})

    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2)
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('42'))

    await boxV2.increment()
    //result = 42 + 1 = 43
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('43'))

    await boxV2.store(100)
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('100'))
  })

})