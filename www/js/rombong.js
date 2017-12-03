// Init App
var myApp = new Framework7({
    modalTitle: 'Rombong Sedekah',
    // Enable Material theme
    material: true,
});

// Expose Internal DOM library
var $$ = Dom7;
//add main view
var mainView = myApp.addView('.view-main', {
  });

myApp.onPageInit('rencana-aksi', function (page) {
    // Select Template
    var template = $$('#aksi-template').html();

    // Compile and render
    var compiledTemplate = Template7.compile(template);

    // Defined as function "getrandom"
    function getrandom() {
        // Get JSON Data from UrbanDictionary API 
        $$.getJSON('http://localhost/romsed/donotgit/news.json', function (json) {
    
        // Insert rendered template
        $$('#content-wrap').html(compiledTemplate(json))
        });
    };
    
    // Execute to list UrbanDictionary Definitions
    getrandom();
    
    // Select Pull to refresh content
    var ptrContent = $$('.pull-to-refresh-content');
    
    // On refresh
    ptrContent.on('refresh', function (e) {
        // Emulate 1s loading
        setTimeout(function () {
    
        // Execute getrandom to get new Definitions
        getrandom();
    
        myApp.pullToRefreshDone();
        }, 1000);
    });
});

myApp.onPageInit('donasi', function (page) {
    $$('form.ajax-submit').on('form:success', function (e) {
        var xhr = e.detail.xhr; // actual XHR object
        myApp.hidePreloader();
        var data = e.detail.data; // Ajax repsonse from action file
        //it's my data - Ok or not 
        if (data === "awesome") {
            myApp.alert('Data donasi Anda telah terkirim. Terima kasih.');
            console.log(e.detail.data)
        } else {
            myApp.alert('Maaf, terjadi kesalahan.');
            console.log("ERROR");
            console.log(e.detail.data);
            }
    // do something with response data
    });
});