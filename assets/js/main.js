/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });


  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
// JavaScript to Handle Review Submissions
document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from refreshing the page

  // Get form inputs
  const name = document.getElementById('name').value;
  const review = document.getElementById('review').value;
  const rating = document.getElementById('rating').value;

  // Create review card
  const reviewCard = document.createElement('div');
  reviewCard.classList.add('col-lg-4', 'review-card');
  reviewCard.setAttribute('data-aos', 'fade-up');
  reviewCard.innerHTML = `
    <div class="testimonial-item">
      <h4>${name}</h4>
      <div class="stars">
        ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
      </div>
      <p>${review}</p>
    </div>
  `;

  // Add to reviews list
  const reviewsList = document.getElementById('reviewsList');
  reviewsList.appendChild(reviewCard);

  // Clear the form
  document.getElementById('reviewForm').reset();
});

// Function to display reviews dynamically in the reviews section
const setReviews = (reviews) => {
  const reviewsList = document.getElementById('reviewsList');
  reviewsList.innerHTML = ''; // Clear existing reviews

  if (reviews.length === 0) {
    reviewsList.innerHTML = '<p class="text-muted">No reviews yet. Be the first to leave one!</p>';
    return;
  }

  reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('col-lg-4', 'col-md-6');

    reviewElement.innerHTML = `
      <div class="review-item p-3 border rounded">
        <h5 class="fw-bold">${review.author}</h5>
        <p>${review.content}</p>
        <small class="text-muted">${new Date(review.createdAt).toLocaleDateString()}</small>
      </div>
    `;

    reviewsList.appendChild(reviewElement);
  });
};

// Fetch reviews from the backend and display them
const fetchReviews = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/reviews');
    const data = await response.json();
    console.log(data); // Debug: Check if data is being fetched correctly
    setReviews(data);  // Update the UI with the fetched reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

// Submit a new review to the backend
const submitReview = async (author, content) => {
  try {
    await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content }),
    });
    fetchReviews(); // Refresh the reviews after submission
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};

// Handle the form submission
document.getElementById('reviewForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const author = document.getElementById('name').value;
  const content = document.getElementById('review').value;

  // Clear the form fields after submission
  document.getElementById('name').value = '';
  document.getElementById('review').value = '';

  submitReview(author, content);
});

// Fetch reviews when the page loads
fetchReviews();





