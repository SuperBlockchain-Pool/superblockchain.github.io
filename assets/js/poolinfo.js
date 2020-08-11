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
        var poolWorkers  = 'N/A';
        if (data.pool) {
            poolHashrate = getReadableHashRate(data.pool.hashrate);
            poolMiners   = data.pool.miners || 0;
            poolWorkers  = data.pool.workers || 0;
        }

        var networkHashrate = 'N/A';
        var networkDiff     = 'N/A';
        if (data.network) {
            networkHashrate = getReadableHashRate(data.network.difficulty / data.config.coinDifficultyTarget);
            networkDiff     = data.network.difficulty;
        }

        var hashPower = 'N/A';
        if (data.pool && data.network) {
            hashPower = data.pool.hashrate / (data.network.difficulty / data.config.coinDifficultyTarget) * 100;
            hashPower = hashPower.toFixed(2) + '%';
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
            if (cnVariant === 1) {
                algorithm = 'Argon2id Pengo';
            } else {
                algorithm = 'Argon2id Chukwa';
            }    
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
	    updateText(poolID + '_poolWorkers', poolWorkers);
        updateText(poolID + '_networkHashrate', networkHashrate);
        updateText(poolID + '_hashPower', hashPower);
        updateText(poolID + '_blocksFound', blocksFound);
        updateText(poolID + '_algorithm', algorithm);
    });
}

// Update pools
function updatePools() {
    getPoolStats('bitcoinnova', 'https://superblockchain.con-ip.com:8132'); // Server 1
    getPoolStats('zent', 'https://superblockchain.con-ip.com:8135'); // Server 1
    getPoolStats('ultranote', 'https://superblockchain.con-ip.com:8137'); // Server 1
    // getPoolStats('ultranotei', 'https://superblockchain.con-ip.com:8139'); // Server 1
    getPoolStats('cirquity', 'https://superblockchain.con-ip.com:8143'); // Server 1
    getPoolStats('wechain', 'https://superblockchain.con-ip.com:8145'); // Server 1
    getPoolStats('securecash', 'https://superblockchain.con-ip.com:8147'); // Server 1
    getPoolStats('goodness', 'https://superblockchain.con-ip.com:8149'); // Server 1
    getPoolStats('nibble', 'https://superblockchain.con-ip.com:8151'); // Server 2
    getPoolStats('qwertycoin', 'https://superblockchain.con-ip.com:8333'); // Server 2
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
