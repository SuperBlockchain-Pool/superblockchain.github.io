/**
 * Pool statistics
 **/

// Get stats from pool API
function getPoolStats(poolID, poolURL) {
    var apiURL = poolURL + '/stats';
    $.get(apiURL, function(data){
        if (!data) return ;

        var poolHashrate = 'N/A';
        var poolMiners   = 'N/A';
        var poolMinersSolo   = 'N/A';
        var poolWorkers  = 'N/A';
        var poolWorkersSolo = 'N/A';
        if (data.pool) {
            poolHashrate = getReadableHashRate(data.pool.hashrate);
            poolMiners   = data.pool.miners || 0;
            poolMinersSolo   = data.pool.miners || 0;
            poolWorkers  = data.pool.workers || 0;
            poolWorkersSolo  = data.pool.workersSolo || 0;
        }

        var poolBlockReward = 'N/A';
        if (data.lastblock) {
            poolBlockReward = (data.lastblock.reward / data.config.denominationUnit).toFixed(3)|| 0;

        }

        var networkHashrate = 'N/A';
        var networkDiff     = 'N/A';
        if (data.network) {
            networkHashrate = getReadableHashRate(data.network.difficulty / data.config.coinDifficultyTarget);
            networkDiff     = data.network.difficulty;
        }

        var hashPower = 'N/A';
        var poolDifficulty = 'N/A';
        var poolBlockheight = 'N/A';
        var hasheffort = 'N/A';

        if (data.pool && data.network) {
            hashPower = data.pool.hashrate / (data.network.difficulty / data.config.coinDifficultyTarget) * 100;
            hashPower = hashPower.toFixed(2) + '%';
            poolDifficulty = data.network.difficulty;
            poolBlockheight = data.network.height;
            hasheffort = (data.pool.roundHashes / data.network.difficulty * 100).toFixed(1) + '%';
        }

        var blocksFound = data.pool.totalBlocks.toString();

        var cnAlgorithm = data.config.cnAlgorithm || "cryptonight";
        var cnVariant = data.config.cnVariant || 0;

        if (cnAlgorithm == "cryptonight_light") {
            if (cnVariant === 1) {
                algorithm = 'Cryptonight Light v7';
            } else if (cnVariant === 2) {
                algorithm = 'Cryptonight Light v7';
            } else {
                algorithm = 'Cryptonight Light';
            }
        }
	    else if (cnAlgorithm == "cryptonight_pico") {
            algorithm = 'Cryptonight Turtle';
        }
        else if (cnAlgorithm == "cryptonight_heavy") {
            algorithm = 'Cryptonight Heavy';
        }
        else if (cnAlgorithm == "argon2") {
            algorithm = 'Argon2id Chukwa';
        }
        else {
            if (cnVariant === 1) {
                algorithm = 'Cryptonight v7';
            } else if (cnVariant === 3) {
                algorithm = 'Cryptonight v7';
            } else if (cnVariant === 11) {
                algorithm = 'Cryptonight Conceal';
            } else {
                algorithm = 'Cryptonight';
            }
        }

        updateText(poolID + '_poolHashrate', poolHashrate);
        updateText(poolID + '_poolMiners', poolMiners);
        updateText(poolID + '_poolMinersSolo', poolMinersSolo);
	    updateText(poolID + '_poolWorkers', poolWorkers);
        updateText(poolID + '_poolWorkersSolo', poolWorkersSolo);
        updateText(poolID + '_networkHashrate', networkHashrate);
        updateText(poolID + '_hashPower', hashPower);
        updateText(poolID + '_poolDifficulty', poolDifficulty);
        updateText(poolID + '_poolBlockheight', poolBlockheight);
        updateText(poolID + '_hasheffort', hasheffort);
        updateText(poolID + '_blocksFound', blocksFound);
        updateText(poolID + '_poolBlockReward', poolBlockReward);
        updateText(poolID + '_algorithm', algorithm);
    });
}

// Update pools
function updatePools() {
    getPoolStats('qwertycoin', 'https://superblockchain.con-ip.com:9002'); // Server 1
    getPoolStats('infinium_cn_lt_v7', 'https://superblockchain.con-ip.com:14016'); // Server 2
    getPoolStats('infinium_zls', 'https://superblockchain.con-ip.com:14018'); // Server 2
    getPoolStats('infinium_cn', 'https://superblockchain.con-ip.com:14020'); // Server 2
    getPoolStats('bitcoinnova', 'https://superblockchain.con-ip.com:14022'); // Server 2
    getPoolStats('arms', 'https://superblockchain.con-ip.com:14024'); // Server 2 
    getPoolStats('cirquity', 'https://superblockchain.con-ip.com:14026'); // Server 2
    getPoolStats('securecash', 'https://superblockchain.con-ip.com:14028'); // Server 2
    getPoolStats('zentcash', 'https://superblockchain.con-ip.com:14036'); // Server 2
    getPoolStats('monero', 'https://superblockchain.con-ip.com:34002'); // Server 3
    getPoolStats('bitcoinmono', 'https://superblockchain.con-ip.com:34004'); // Server 3
    getPoolStats('nevocoin', 'https://superblockchain.con-ip.com:34006'); // Server 3
    getPoolStats('moneroclassic', 'https://superblockchain.con-ip.com:34008'); // Server 3
    getPoolStats('bytecoin', 'https://superblockchain.con-ip.com:34010'); // Server 3
    getPoolStats('apepepow', 'https://superblockchain.con-ip.com:34014'); // Server 3
    getPoolStats('zephyr', 'https://superblockchain.con-ip.com:34016'); // Server 3
    getPoolStats('sispop', 'https://superblockchain.con-ip.com:34018'); // Server 3
    getPoolStats('morelo', 'https://superblockchain.con-ip.com:34020'); // Server 3
    getPoolStats('gntlcoin', 'https://superblockchain.con-ip.com:34022'); // Server 3
    getPoolStats('traaittcash', 'https://superblockchain.con-ip.com:34024'); // Server 3
    getPoolStats('traaitt', 'https://superblockchain.con-ip.com:34026'); // Server 3
}

// Initialize
$(function() {
    setInterval(updatePools, (30*1000));
    updatePools();
});

/**
 * Strings
 **/

// Update Text content
function updateText(elementId, text){
    var el = document.getElementById(elementId);
    if (el && el.textContent !== text){
        el.textContent = text;
    }
    return el;
}

// Get readable hashrate
function getReadableHashRate(hashrate){
    var i = 0;
    var byteUnits = [' H', ' KH', ' MH', ' GH', ' TH', ' PH' ];
    while (hashrate > 1000){
        hashrate = hashrate / 1000;
        i++;
    }
    return hashrate.toFixed(2) + byteUnits[i] + '/s';
}
