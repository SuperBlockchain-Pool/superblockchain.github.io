var api = 'https://superblockchain.con-ip.com/api/gns';
var donationAddress = "gnsm5vgk8fCUP1ZKUQfRZSQ8WdH2smkQ6M3W8nwe3fo63HsJKmPy3hHcasewYUj55cJ9S7uYFXhFUTAV9n82nUCZ49u6k7jn2m";
var blockTargetInterval = 175; // enter the block interval in seconds
var coinUnits = 100000000;  // enter in the amount of atomic units in 1 coin, eg. 100000000 shells = 1 GNS
var totalSupply =  10000000000000000000; // enter the total supply in atomic units
var symbol = 'GNS'; // enter the coin's ticker
var refreshDelay = 30000;
var networkStat = {
 "gns": [
  ["superblockchain.con-ip.com/gns", "https://superblockchain.con-ip.com:8149"],
  ["communitypool.org/goodness", "https://xvv.communitypool.org:8237"]
 ]
};

var networkStat2 = {
 "gns": [
  ["superblockchain.con-ip.com/gns", "https://superblockchain.con-ip.com:8149"],
  ["communitypool.org/goodness", "https://xvv.communitypool.org:8237"]
 ]
};

var networkStat3 = {
 "gns": [
	["webgns.semipool.com", "https://webgns.semipool.com/api"]	
 ]
};
