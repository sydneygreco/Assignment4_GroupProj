window.Instagram = {
  /**
  * application storage for settings.
  */
  config: {},

  BASE_URL: "https://api.instagram.com/v1",

  init: function(opt) {
    opt = opt || {};

    this.config.client_id = opt.client_id;
  },

  popular:function() {
  },

  //Gets a list of recently tagged media.
  tagsByName: function(name){
    var endpoint = this.BASE_URL + '/tags' + name + '/media/recent?client_id=' + this.config.client_id;
    this.getJSON(endpoint, callback);
  },

  getJSON: function(url,callback){}
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: endpoint,
      success: function( responce ) {
        if (typeof callback === 'function') callback(responce);
      }
    });

}

  //Client ID 	42bd0cb5abc4489a82f3eec14e883f1c
  //Client Secret bfa1304323174af18306050cb2b55f41
};

Instagram.init({client_id: "42bd0cb5abc4489a82f3eec14e883f1c";});


//https://api.instagram.com/v1/media/search?popular?client_id=42bd0cb5abc4489a82f3eec14e883f1c
//https://www.youtube.com/watch?v=rfhrKWMSFKU
