'use strict';
let audio = document.createElement('audio');
juke.factory('PlayerFactory', function($http,$rootScope){
  // non-UI logic in here

  let playerFactoryObj = {}, progress=0, currentSong = null, playing = false, songs = null;

    audio.addEventListener('ended', function () {
      this.next();
      // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
      $rootScope.$evalAsync(); // likely best, schedules digest if none happening
    });
    audio.addEventListener('timeupdate', function () {
      progress = audio.currentTime / audio.duration;
      // $scope.$digest(); // re-computes current template only (this scope)
      $rootScope.$evalAsync(); // likely best, schedules digest if none happening
    });

  playerFactoryObj.start = function(song, songList){
    //debugger;
    if (songList) songs = songList;
    this.pause();
    //playing = false;
    // enable loading new song
    if(song === currentSong) return this.resume();
    currentSong = song;
    audio.src = currentSong.audioUrl;
    audio.load();
    audio.play();
    playing = true;
    $rootScope.$evalAsync();
  }

  playerFactoryObj.pause = function(){
    audio.pause();
    playing = false;
    $rootScope.$evalAsync();
  }

  playerFactoryObj.resume = function(){
    // resume current song
    audio.play();
    playing = true;
    $rootScope.$evalAsync();
  }

  playerFactoryObj.isPlaying = function(){
    return playing;
  }

  playerFactoryObj.getCurrentSong = function(){
   return currentSong;
  }

  playerFactoryObj.next = function(){
    console.log('songs is ', songs);
    let currentSongIndex = songs.indexOf(currentSong);
    let nextSongIndex = currentSongIndex + 1;
    songs[nextSongIndex] ? this.start(songs[nextSongIndex]) : this.start(songs[0]);
  }

  playerFactoryObj.prev = function(){
    let currentSongIndex = songs.indexOf(currentSong);
    let prevSongIndex = currentSongIndex - 1;
    songs[prevSongIndex] ? this.start(songs[prevSongIndex]) : this.start(songs[songs.length-1]);
  }

  playerFactoryObj.getProgress = function(){
    return progress;
  }

  playerFactoryObj.updateProgress = function(dec){
    audio.currentTime = audio.duration * dec;
    $rootScope.$evalAsync();
  }

  return playerFactoryObj;
});
