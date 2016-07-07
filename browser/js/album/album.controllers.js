'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
  // load our initial data

  AlbumFactory.fetchById(2) // temp: get one
  .then(function (res) { return res.data; })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;

    StatsFactory.totalTime($scope.album)
    .then(function (albumDuration){
      $scope.fullDuration = albumDuration;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if(PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()){
      PlayerFactory.pause();
    } else PlayerFactory.start(song, $scope.album.songs);
/*    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);*/
    //return [$scope.playing = PlayerFactory.isPlaying(), $scope.currentSong = PlayerFactory.getCurrentSong()];
  };

  $scope.playing = function(){
    return PlayerFactory.isPlaying();
  }
  $scope.currentSong = function(){
    return PlayerFactory.getCurrentSong();
  }

  function next () { PlayerFactory.next(); };
  function prev () { PlayerFactory.prev(); };

});

//old stuff
  // incoming events (from Player, toggl e, or skip)
/*  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);*/

  // functionality
/*  function pause () {
    $scope.playing = false;
  }
  function play (event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  };*/

  // a "true" modulo that wraps negative to the top of the range
/*  function mod (num, m) { return ((num % m) + m) % m; };*/

  // jump `interval` spots in album (negative to go back, default +1)
/*  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };*/
