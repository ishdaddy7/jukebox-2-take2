'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory, AlbumFactory, StatsFactory) {



  // main toggle
  $scope.toggle = function (song) {
    //PlayerFactory.start(song);
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    }
    else {
      PlayerFactory.resume();
/*      $scope.playing = function(){
       return PlayerFactory.isPlaying();
      }*/
    }
  };

  $scope.currentSong = function(){
    return PlayerFactory.getCurrentSong();
  }

  $scope.playing = function(){
    return PlayerFactory.isPlaying();
  }

  $scope.next = function () { PlayerFactory.next(); };
  $scope.prev = function () { PlayerFactory.prev(); };

  $scope.progress = function(){
    return PlayerFactory.getProgress() * 100;
  }

  function seek (decimal) {
    PlayerFactory.updateProgress(decimal);
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});




//OLD STUFf

  // state
/*  $scope.currentSong;
  $scope.playing = false;*/

/*  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  audio.addEventListener('ended', function () {
    $scope.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });*/

  // incoming events (from Album or toggle)
/*  $scope.$on('pause', pause);
  $scope.$on('play', play);*/

  // functionality
  /*function pause () {
    audio.pause();
    $scope.playing = false;
  }
  function play (event, song){
    // stop existing audio (e.g. other song) in any case
    pause();
    $scope.playing = true;
    // resume current song
    if (song === $scope.currentSong) return audio.play();
    // enable loading new song
    $scope.currentSong = song;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }*/
