if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

class LwcCoin {

  /**
   * @param {String} algorithmSettingsFile 
   * @param {String} algorithmFolderPath 
   * @param {Object} lwcSettings
   */
  constructor(algorithmSettingsFile, algorithmFolderPath, lwcSettings) {
    this._algorithmSettings = [];
    this._algorithms = [];
    this._lwcSettings = lwcSettings;
    this.algorithmSettingsFile = algorithmSettingsFile;
    this.algorithmFolderPath = algorithmFolderPath;
  }

  _getLwcSettings() {
    return this._lwcSettings;
  }

  /**
   * @param {$} el 
   * @param {Object} settings 
   * @param {Object} attributes 
   * @param {Object} algorithm 
   */
  _translate(el, settings, attributes, algorithm) {
    let coins = el.attr(attributes.textCoins || 'data-coins');
    let attr = el.attr(attributes.attrCoins || 'data-coins-attr');
    let replacement = algorithm ? algorithm.json : {};
    let objects = coins.split('.');

    objects.forEach(obj => {
      if (replacement)
        replacement = replacement[obj];
    });
    
    if (settings.paragraphSupport && (typeof replacement == "string")){
      let breaks = replacement.split(/\n/g);
      if (breaks.length > 1) {
        for (let j = 0; j < breaks.length; j++)
          breaks[j] = '<p>' + breaks[j] + '</p>';
        
        replacement = breaks.join('');
      }
    }

    if (attr)
      el.attr(attr, replacement);
    else
      el.html(replacement);
  }

  /**
   * @param {Function} callback 
   */
  _onLoad(callback) {
    let settings = this._getLwcSettings();
    let attributes = settings.attributes || {};
    let algorithm = this.getAlgorithm(settings.defaultAlgorithm || 'select-currency');
    let elements = $(`[${attributes.textCoins || 'data-coins'}]`);

    elements.each((i, element) => {
      this._translate($(element), settings, attributes, algorithm);
    });
    
    if (callback) callback.call(this, this.getAlgorithms());
  }

  /**
   * @param {Array|Object} algorithms 
   */
  addAlgorithms(algorithms) {
    this._algorithms = algorithms;
  }

  /**
   * @param {String} filename 
   */
  getAlgorithm(filename) {
    return this.getAlgorithms().filter((e) => e.filename == filename)[0];
  }

  getAlgorithms() {
    return this._algorithms;
  }

  /**
   * @param {Array|Object} settings 
   */
  setAlgorithmSettings(settings) {
    this._algorithmSettings = settings;
  }

  getAlgorithmSettings() {
    return this._algorithmSettings;
  }

  /**
   * @param {Boolean} async
   * @param {Object} listeners 
   * @param {Function} listeners.onSettingsLoad 
   * @param {Function} listeners.onAlgorithmLoaded
   * @param {Function} listeners.onAlgorithmsLoaded
   */
  load(async, listeners) {
    $.ajax({
      url: this.algorithmSettingsFile,
      async: async
    }).done((json) => {
      this.setAlgorithmSettings(json);
      let algorithms = [];
      
      for (let i = 0; i < json.length; i++){
        $.ajax({
          url: this.algorithmFolderPath + json[i].filename + ".json",
          async: async
        }).done((algorithm) => {
          algorithms.push({filename: json[i].filename, json: algorithm});

          if (i == json.length - 1) {
            this.addAlgorithms(algorithms);
            this._onLoad(listeners.onAlgorithmsLoaded);
          }
          
          if (listeners.onAlgorithmLoaded) listeners.onAlgorithmLoaded.call(this, algorithm);
        }).fail((e) => {
          throw new Error("Failed to load algorithm from " + this.algorithmFolderPath + json[i].filename + ".json");
        });
      }
      
      if (listeners.onSettingsLoad) listeners.onSettingsLoad.call(this, json);
    }).fail(() => {
      throw new Error("Failed to load " + this.algorithmSettingsFile);
    });
  }

}

/**
 * @param {Object} settings
 * @param {String} settings.algorithmSettingsFile
 * @param {String} settings.algorithmFolderPath
 * @param {Boolean} settings.async
 * @param {String} settings.defaultalgorithm
 * @param {Object} settings.attributes
 * @param {String} settings.attributes.textCoins
 * @param {String} settings.attributes.attrCoins
 * @param {Boolean} settings.paragraphSupport
 * @param {Function} settings.onAlgorithmSettingsLoaded
 * @param {Function} settings.onAlgorithmLoaded
 * @param {Function} settings.onAlgorithmsLoaded
 */
$.fn.lwcCoin = function(settings) {
  let coin = new LwcCoin(settings.algorithmSettingsFile, settings.algorithmFolderPath, settings);
  
  if (!settings || Object.entries(settings).length === 0 && settings.constructor === Object) {
    throw new Error("Please add at least a algorithm settings file path and a folder path.");
  } else {
    if (!settings.algorithmSettingsFile || !settings.algorithmFolderPath || settings.algorithmSettingsFile === '' || settings.algorithmFolderPath === '') {
      throw new Error("Path cannot be empty.");
    } else {
      settings.paragraphSupport = settings.paragraphSupport || true;
      coin.load(
        settings.async || true, {
          onSettingsLoad: settings.onAlgorithmSettingsLoaded,
          onAlgorithmLoaded: settings.onAlgorithmLoaded,
          onAlgorithmsLoaded: settings.onAlgorithmsLoaded
        });
    }
  }

  return coin;
}