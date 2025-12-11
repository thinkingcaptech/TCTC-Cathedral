/**
 * Portfolio Widget - Vanilla JavaScript
 * Manages the floating contact widget and modal functionality
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {

    // Get DOM elements
    const container = document.querySelector('.floating-head-container');
    const headBtn = document.querySelector('.head-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalCard = document.querySelector('.modal-card');
    const closeBtn = document.querySelector('.modal-close');

    // Check if elements exist
    if (!container || !headBtn || !modalBackdrop || !modalCard || !closeBtn) {
      console.warn('Portfolio widget: Required DOM elements not found');
      return;
    }

    // Trigger slide-in animation after 1 second
    setTimeout(function() {
      container.classList.add('slide-in');
    }, 1000);

    // Open modal function
    function openModal() {
      modalBackdrop.style.display = 'flex';
      // Trigger reflow to enable animation
      modalBackdrop.offsetHeight;
      modalBackdrop.classList.add('active');
    }

    // Open modal when clicking the floating head button
    headBtn.addEventListener('click', function() {
      openModal();
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
      closeModal();
    });

    // Close modal when clicking the backdrop (but not the card)
    modalBackdrop.addEventListener('click', function(event) {
      if (event.target === modalBackdrop) {
        closeModal();
      }
    });

    // Prevent clicks on the modal card from closing the modal
    modalCard.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    // Close modal function
    function closeModal() {
      modalBackdrop.classList.remove('active');
      setTimeout(function() {
        modalBackdrop.style.display = 'none';
      }, 300); // Wait for fade animation
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modalBackdrop.style.display === 'flex') {
        closeModal();
      }
    });
  });
})();
