/**
 * Audio Analytics Tracker
 * Tracks audio playback events for music portfolio
 */

(function() {
  'use strict';

  // Track audio play events
  function trackAudioPlay(songTitle, songGenre) {
    // Log to console (for development)
    console.log('Audio Play:', songTitle, '|', songGenre);
    
    // If you have Google Analytics, uncomment and use:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', 'audio_play', {
    //     'song_title': songTitle,
    //     'song_genre': songGenre,
    //     'page_location': window.location.pathname
    //   });
    // }
    
    // Store play count in localStorage for basic tracking
    const playCountKey = 'audio_plays_' + songTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const currentCount = parseInt(localStorage.getItem(playCountKey) || '0');
    localStorage.setItem(playCountKey, (currentCount + 1).toString());
    
    // Store last played timestamp
    localStorage.setItem(playCountKey + '_lastPlayed', new Date().toISOString());
  }

  // Initialize tracking when DOM is ready
  function initAudioTracking() {
    // Find all audio players
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(function(audio) {
      // Get song info from parent card
      const card = audio.closest('.music-card');
      if (!card) return;
      
      const songTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Unknown';
      const songGenre = card.querySelector('.genre') ? card.querySelector('.genre').textContent.trim() : 'Unknown';
      
      // Track play event
      audio.addEventListener('play', function() {
        trackAudioPlay(songTitle, songGenre);
      });
      
      // Track when user gets 25%, 50%, 75%, 100% through song
      let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
      
      audio.addEventListener('timeupdate', function() {
        if (!audio.duration) return;
        
        const percent = (audio.currentTime / audio.duration) * 100;
        
        if (percent >= 25 && !tracked25) {
          tracked25 = true;
          console.log('Audio 25%:', songTitle);
        }
        if (percent >= 50 && !tracked50) {
          tracked50 = true;
          console.log('Audio 50%:', songTitle);
        }
        if (percent >= 75 && !tracked75) {
          tracked75 = true;
          console.log('Audio 75%:', songTitle);
        }
        if (percent >= 98 && !tracked100) {
          tracked100 = true;
          console.log('Audio Complete:', songTitle);
        }
      });
    });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioTracking);
  } else {
    initAudioTracking();
  }

  // Expose function to get play counts (for admin/debugging)
  window.getAudioPlayCounts = function() {
    const counts = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('audio_plays_') && !key.endsWith('_lastPlayed')) {
        const songKey = key.replace('audio_plays_', '').replace(/_/g, ' ');
        counts[songKey] = {
          plays: parseInt(localStorage.getItem(key)),
          lastPlayed: localStorage.getItem(key + '_lastPlayed')
        };
      }
    }
    return counts;
  };

  // Console message on how to view stats
  console.log('%c🎵 Audio Analytics Active', 'color: #00ff00; font-weight: bold; font-size: 14px;');
  console.log('%cTo view play counts, run: getAudioPlayCounts()', 'color: #00aaff; font-size: 12px;');

})();
