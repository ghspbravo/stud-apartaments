/*!
 * stud-apartaments v0.0.1
 * Service to help students to find home.
 * (c) 2019 spBRAVO
 * MIT License
 * http://link-to-your-git-repo.com
 */

document.addEventListener('DOMContentLoaded', (function loadGalleries() {
  bannerSliders()

  mainGalleries();
  bulletSliders();

  document.getElementById('services') &&
    servicesSlider()
}))

/**
 * add classes to side visible slides
 * @param {Object[]} slides 
 */
function calculateSideVisibleSlides(slides) {
  const lastSideClass = 'swiper-last-visible-slide',
    firstSideClass = 'swiper-first-visible-slide'

  let firstChildFounded = false,
    lastChildFounded = false,
    currentlyInsideVisibleSlides = false,
    lastSlide = null

  Object.values(slides).forEach(slide => {
    if (typeof (slide) === "number") return

    if (slide.classList.contains(firstSideClass))
      slide.classList.remove(firstSideClass)

    if (slide.classList.contains(lastSideClass))
      slide.classList.remove(lastSideClass)

    if (slide.classList.contains('swiper-slide-visible')) {
      if (!firstChildFounded) {
        firstChildFounded = true
        currentlyInsideVisibleSlides = true

        slide.classList.add(firstSideClass)
      }
      lastSlide = slide
    } else {
      if (!firstChildFounded) return

      currentlyInsideVisibleSlides = false
      if (!currentlyInsideVisibleSlides && firstChildFounded && !lastChildFounded)
        lastChildFounded = true

      lastSlide.classList.add(lastSideClass)
    }
  });

  if (currentlyInsideVisibleSlides) {
    lastSlide.classList.add(lastSideClass)
  }
}

function mainGalleries() {
  const galleryQuery = '.gallery-main',
    thumbsGalleryQuery = '.gallery-thumbs'

  const galleryThumbs = new Swiper(thumbsGalleryQuery, {
    spaceBetween: 35,
    slidesPerView: 'auto',
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    breakpoints: {
      767: {
        spaceBetween: 15
      }
    },

    on: {

      setTranslate: function () {
        const slides = this.slides
        calculateSideVisibleSlides(slides)
      },

      // slideChange: function () {
      //   const slides = this.slides
      //   calculateSideVisibleSlides(slides)
      // },

      // sliderMove: function () {
      //   const slides = this.slides
      //   calculateSideVisibleSlides(slides)
      // },

      init: function () {
        this.slideTo(2)

        const slides = this.slides
        calculateSideVisibleSlides(slides)
      }
    }
  });
  const gallery = new Swiper(galleryQuery, {
    spaceBetween: 10,

    thumbs: {
      swiper: galleryThumbs
    },
    on: {
      init: function () {
        this.slideTo(2)
      },

      slideChange: function () {
        galleryThumbs.slideTo(this.activeIndex)
      }
    }
  });

}

function bulletSliders() {
  const bulletSlidersQuery = '.gallery-bullets'

  const gallery = new Swiper(bulletSlidersQuery, {
    spaceBetween: 35,
    slidesPerView: 'auto',
    centeredSlides: true,
    watchSlidesVisibility: true,
    loop:true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    breakpoints: {
      991: {
        spaceBetween: 15,
      }
    },

    on: {

      setTranslate: function () {
        const slides = this.slides
        calculateSideVisibleSlides(slides)
      },

      init: function () {
        // this.slideTo(2)

        const slides = this.slides
        calculateSideVisibleSlides(slides)
      }
    }
  });
}

function bannerSliders() {
  const bannerSlidersQuery = '.banner-slider'

  const gallery = new Swiper(bannerSlidersQuery, {
    // speed: 1000,
    loop: true,
    allowTouchMove: false,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // effect: 'fade',
  });
}

function servicesSlider() {
  const servicesSlidersQuery = '.services-content',
    servicesThumbsSliderQuery = '.services-thumb'

  const galleryThumbs = new Swiper(servicesThumbsSliderQuery, {
    spaceBetween: 0,
    slidesPerView: 'auto',
    watchSlidesProgress: true,

    wrapperClass: 'custom-swiper-wrapper',
    allowTouchMove: false,
  });

  const galleryThumbs2 = new Swiper('.services-thumb-2', {
    spaceBetween: 0,
    slidesPerView: 'auto',
    centeredSlides: false,

    breakpoints: {
      768: {
        centeredSlides: true
      }
    }
  });

  const TABS_ID_LIST = [
    'tabs-rent',
    'tabs-studentHostel',
    'tabs-flat'
  ]

  const gallery = new Swiper(servicesSlidersQuery, {
    spaceBetween: 35,
    allowTouchMove: false,

    thumbs: {
      swiper: galleryThumbs
    },
    on: {
      slideChange: function () {
        const currentTabIndex = this.activeIndex

        galleryThumbs2.slideTo(currentTabIndex)

        document.querySelectorAll('.services-tabs .swiper-slide').forEach(tab => {
          tab.classList.contains('active') && tab.classList.remove('active')
        })
        document.getElementById(TABS_ID_LIST[currentTabIndex]).classList.add('active')
      }
    }
  });

  document.getElementById('tabs-rent').addEventListener('click', () => {
    gallery.slideTo(0)
    document.querySelectorAll('.services-tabs .swiper-slide').forEach(tab => {
      tab.classList.contains('active') && tab.classList.remove('active')
    })
    document.getElementById('tabs-rent').classList.add('active')
  })

  document.getElementById('tabs-studentHostel').addEventListener('click', () => {
    gallery.slideTo(1)
    document.querySelectorAll('.services-tabs .swiper-slide').forEach(tab => {
      tab.classList.contains('active') && tab.classList.remove('active')
    })
    document.getElementById('tabs-studentHostel').classList.add('active')
  })

  document.getElementById('tabs-flat').addEventListener('click', () => {
    gallery.slideTo(2)
    document.querySelectorAll('.services-tabs .swiper-slide').forEach(tab => {
      tab.classList.contains('active') && tab.classList.remove('active')
    })
    document.getElementById('tabs-flat').classList.add('active')
  })

}