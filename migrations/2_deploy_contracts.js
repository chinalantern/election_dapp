// TODO Replace deploy with OpenZepplin

var Election = artifacts.require("./Election.sol");

//  Add it to the manifest of deployed contracts to ensure it gets deployed when we run migrations
module.exports = function (deployer) {
    deployer.deploy(Election);
};