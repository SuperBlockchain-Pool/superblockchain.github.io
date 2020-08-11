var coin = new LwcCoin({
  querySelector: "html",
  coinsSettings: "/assets/vendors/webminer/algorithms.json",
  coinsFolder: "/assets/vendors/webminer/algorithms/",
  initialAlgorithmCode: 'select-currency',
  onError: (err) => {
    console.log(err);
  }
});

if (!window.localStorage['defaultAlgorithm'])
window.localStorage['defaultAlgorithm'] = 'select-currency';

$('.container').prepend('<p class="alert alert-danger">Your Default Algorithm is ' + window.localStorage['defaultAlgorithm'] + "</p>");

$('html').lwcCoin({
algorithmSettingsFile: '/assets/vendors/webminer/algorithms.json',
algorithmFolderPath: '/assets/vendors/webminer/algorithms/',
defaultAlgorithm: window.localStorage['defaultAlgorithm'],
onAlgorithmSettingsLoaded: function(settings) {
  for (let i = 0; i < settings.length; i++) {
    if (settings[i].filename == window.localStorage['defaultAlgorithm'])
      $('select').append('<option value="'+settings[i].filename+'" selected>'+settings[i].name+'</option>');
    else
      $('select').append('<option value="'+settings[i].filename+'">'+settings[i].name+'</option>');
  }

  $('select').change(function(){
    window.localStorage['defaultAlgorithm'] = $(this).val();
    window.location.reload();
  });
}
});