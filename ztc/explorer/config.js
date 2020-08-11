var api = 'https://seedpro2.zent.cash';
var donationAddress = "";
var blockTargetInterval = 60; // enter the block interval in seconds
var coinUnits = 100;  // enter in the amount of atomic units in 1 coin, eg. 100 shells = 1 ZTC
var totalSupply =  750000000000; // enter the total supply in atomic units
var symbol = 'ZTC'; // enter the coin's ticker
var refreshDelay = 30000;

// pools stats by MainCoins
var networkStat = {
 "ztc": [
   ["cryptonote.club", "https://ztc.cryptonote.club:8199"],
	 ["cryptohispano.net", "https://ztc.cryptohispano.net/api"],
   ["fastpool.xyz", "https://backup.fastpool.xyz:8128"],
   ["superblockchain.con-ip.com", "https://superblockchain.con-ip.com:8135"],
   ["pool001.zent.cash", "https://pool001api.zent.cash:8080"]
 ]
};

var networkStat2 = {
  "ztc": [
    ["cryptonote.club", "https://ztc.cryptonote.club:8199"],
    ["cryptohispano.net", "https://ztc.cryptohispano.net/api"],
    ["fastpool.xyz", "https://backup.fastpool.xyz:8128"],
    ["superblockchain.con-ip.com", "https://superblockchain.con-ip.com:8135"],
    ["pool001.zent.cash", "https://pool001api.zent.cash:8080"]
 ]
};

var networkStat3 = {
   "ztc": [
     ["webztc.semipool.com", "https://webztc.semipool.com/api"]
  ]
};
