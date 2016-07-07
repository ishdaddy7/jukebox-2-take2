juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFactory', function($http){
  var albumFactoryObj = {};

  albumFactoryObj.fetchAll = function(){
    return $http.get('/api/albums');
  };

  albumFactoryObj.fetchById = function(songId){
    return $http.get('/api/albums/' + songId);
  };

  return albumFactoryObj;

});
