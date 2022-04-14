const TokenSale=artifacts.require("MyTokenSale.sol");
const Token=artifacts.require("MyToken.sol");
const KycContract=artifacts.require("KycContract.sol");
const chai=require("./setupChai");
const BN=web3.utils.BN;

const expect=chai.expect;

contract("Token Test", async (accounts)=>{
    const [deployerAccount, recipient, anotherAccount]=accounts;

    it("should not have any tokens in my deployment accoutn", async()=>{
        let instance=await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in the TokenSale Smart Contract by default", async()=>{
        let instance =await Token.deployed();
        let balanceOfTokenSaleSmartContract=await instance.balanceOf(TokenSale.address);
        let totalSupply=await instance.totalSupply();
        expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy tokens",async()=>{
        let tokenInstance=Token.deployed();
        let tokenSaleInstnace=await TokenSale.deployed();
        let kycInstance=await KycContract.deployed();
        let balancebefore=await tokenInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstnace.sendTransaction({from: deployerAccount, value:web3.utils.towei("1","wei")})).to.be.fulfilled;
        balancebefore=balancebefore.add(new BN(1));
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balancebefore);
    })

});