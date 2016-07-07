'use strict'

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory){

  AlbumFactory.fetchAll()
  .then(function (res){
    return $scope.albums = res.data;
  })
  .then(function(albums){
    albums.forEach(function(album){
      album.imageUrl = album.imageUrl = '/api/albums/' + album.id + '/image';
    });
    $scope.albums = albums;
    //console.log($scope.albums);
  })
   .catch($log.error);
});
