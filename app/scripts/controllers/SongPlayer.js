(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */          
var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
    });    
    
    SongPlayer.currentSong = song;
};

var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
}
        
/*
* @desc Active song object from list of songs
* @type {Object}
*/
SongPlayer.currentSong = null;
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
SongPlayer.currentTime = null;
/*
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */        
SongPlayer.play = function(song) {
    song = song || SongPlayer.currentSong;
    if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
    } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
        }
    }      
};

/**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */
SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
};

SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
    }
};        
    return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();