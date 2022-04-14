const Token=artifacts.require("MyToken");

const chai=require("./setupChai");
const BN=web3.utils.BN;

const expect=chai.expect;

contract("Token Test", async (accounts)=>{
    const [deployerAccount, recipient, anotherAccount]=accounts;
    beforeEach(async()=>{
        this.myToken=await Token.new(process.env.INITIAL_TOKEN);
    })

    it("All token should be in my Accounts", async()=>{
        let instance=await this.myToken;
        let totalSupply=await instance.totalSupply();
        // let balance =await instance.balanceOf(deployerAccount);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        return expect(await instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("it is possible to send tokens betweeb accounts", async()=>{
        const sendTokens=1;
        let instance=await this.myToken;
        let totalSupply=await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("it is not possible to send more tokens than available in total", async()=>{
        let instance=await this.myToken;
        let balanceOfDeployer=await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.fulfilled;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })
})