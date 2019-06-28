/*!
 * stud-apartaments v0.0.1
 * Service to help students to find home.
 * (c) 2019 spBRAVO
 * MIT License
 * http://link-to-your-git-repo.com
 */

document.addEventListener('DOMContentLoaded', (function mainScripts() {
  try {
    attachMobileNavigationEvents()
    attachModalEvents()
    attachFormSubmitEvents()

    attachScrollTo()
    attachScrollSpy()
    attachScrollSpyTabs()
  }
  catch (error) {
    console.log(error)
  }
  finally {

  }
}))

function attachMobileNavigationEvents() {
  const mobileNavControlOpenQuery = '.js-mobile-control-open',
    mobileNavControlCloseQuery = '.js-mobile-control-close'

  document.querySelectorAll(mobileNavControlOpenQuery).forEach(control => {
    control.addEventListener('click', openMobileNav)
  })

  document.querySelectorAll(mobileNavControlCloseQuery).forEach(control => {
    control.addEventListener('click', closeMobileNav)
  })
}

function openMobileNav() {
  const mobileNavQuery = '#js-mobile-navigation',
    mobileNavOpenedClass = 'open',
    mobileControlBurgerQuery = '.mobile-nav-control-burger',
    mobileControlCloseQuery = '.mobile-nav-control-close'

  document.querySelector(mobileControlBurgerQuery).style.display = 'none'
  document.querySelector(mobileControlCloseQuery).style.display = 'block'
  document.querySelector(mobileNavQuery).classList.add(mobileNavOpenedClass)
}

function closeMobileNav() {
  const mobileNavQuery = '#js-mobile-navigation',
    mobileNavOpenedClass = 'open',
    mobileControlBurgerQuery = '.mobile-nav-control-burger',
    mobileControlCloseQuery = '.mobile-nav-control-close'

  document.querySelector(mobileControlBurgerQuery).style.display = 'block'
  document.querySelector(mobileControlCloseQuery).style.display = 'none'
  document.querySelector(mobileNavQuery).classList.remove(mobileNavOpenedClass)
}

function attachModalEvents() {
  const closeModalQuery = '.js-modal-close',
    openModalQuery = '.js-modal-open'

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open')
        // document.body.style.overflowY = 'auto'
      }
    })
  })

  document.querySelectorAll(openModalQuery).forEach(openControl => {
    openControl.addEventListener('click', handleOpenModal)
  })

  document.querySelectorAll(closeModalQuery).forEach(closeControl => {
    closeControl.addEventListener('click', handleCloseModal)
  })
}

function handleCloseModal(e) {
  const targetModal = e.target.dataset.modal

  // document.body.style.overflowY = 'auto'

  switch (targetModal) {
    case 'callback':
      closeModal(document.getElementById('js-modal-callback'))
      break
    case 'callback-success':
      closeModal(document.getElementById('js-modal-callback-success'))
      break
    case 'request':
      closeModal(document.getElementById('js-modal-request'))
      break
    case 'request-success':
      closeModal(document.getElementById('js-modal-request-success'))
      break
    case 'member':
      closeModal(document.getElementById('js-modal-member'))
      break
    case 'member-success':
      closeModal(document.getElementById('js-modal-member-success'))
      break
    case 'review':
      closeModal(document.getElementById('js-modal-review'))
      break
    case 'review-success':
      closeModal(document.getElementById('js-modal-review-success'))
      break
    case 'page':
      closeModal(document.getElementById('js-modal-page'))
      break

    default:
      break;
  }
}

function handleOpenModal(e) {
  const targetModal = e.target.dataset.modal

  // document.body.style.overflowY = 'none'

  switch (targetModal) {
    case 'callback':
      openModal(document.getElementById('js-modal-callback'))
      break;
    case 'request':
      openModal(document.getElementById('js-modal-request'))
      break
    case 'member':
      openModal(document.getElementById('js-modal-member'))
      break
    case 'review':
      openModal(document.getElementById('js-modal-review'))
      break
    case 'page':
      const page = e.target.dataset.page
      setIframePage(page)
      openModal(document.getElementById('js-modal-page'))
      break

    default:
      break;
  }
}

function openModal(node) {
  node.classList.add('open')
}

function closeModal(node) {
  node.classList.remove('open')
}

function attachFormSubmitEvents() {
  const requestFormsQuery = '.js-form-request',
    callbackFormsQuery = '.js-form-callback',
    memberFormsQuery = '.js-form-member',
    reviewFormsQuery = '.js-form-review'

  // request form
  document.querySelectorAll(requestFormsQuery).forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault()
    closeModal(document.getElementById('js-modal-request'))
    openModal(document.getElementById('js-modal-request-success'))
  }))

  // callback form
  document.querySelectorAll(callbackFormsQuery).forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault()
    closeModal(document.getElementById('js-modal-callback'))
    openModal(document.getElementById('js-modal-callback-success'))
  }))

  // member form
  document.querySelectorAll(memberFormsQuery).forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault()
    closeModal(document.getElementById('js-modal-member'))
    openModal(document.getElementById('js-modal-member-success'))
  }))

  // review form
  document.querySelectorAll(reviewFormsQuery).forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault()
    closeModal(document.getElementById('js-modal-review'))
    openModal(document.getElementById('js-modal-review-success'))
  }))
}

function attachScrollTo() {
  const scrollToQuery = '.js-scrollTo'

  document.querySelectorAll(scrollToQuery)
    .forEach(scrollControl => scrollControl.addEventListener('click', e => {
      const anchor = scrollControl.dataset.anchor
      // const anchor = e.target.dataset.anchor

      const scrollPos = document.getElementById(anchor).offsetTop - 50
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth',
      })
    })
    )
}

function attachScrollSpy() {

  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollSpyELement = document.querySelectorAll('.js-scrollspy')

  scrollSpyELement.forEach(element => {

    let elementOffsetTop = 0, elementOffsetBottom = 0

    if (element.dataset.classanchor) {
      const sectionClass = element.dataset.classanchor

      Object.values(document.getElementsByClassName(sectionClass)).forEach((section, index) => {
        if (index === 0) {
          elementOffsetTop = section.offsetTop - 50
          elementOffsetBottom += elementOffsetTop
        }

        elementOffsetBottom += section.offsetHeight
      })
    } else {
      const section = element.dataset.anchor

      elementOffsetTop = document.getElementById(section).offsetTop - 50
      elementOffsetBottom = elementOffsetTop + document.getElementById(section).offsetHeight
    }

    window.addEventListener('scroll', () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > elementOffsetTop && currentScroll < elementOffsetBottom) {
        if (!element.classList.contains('active')) {
          // document.querySelectorAll('.js-scrollspy.active').forEach(activeSpy => activeSpy.classList.remove('active'))
          element.classList.add('active')
        }
      }
      else {
        if (element.classList.contains('active'))
          element.classList.remove('active')
      }
    })

  })
}

function attachScrollSpyTabs() {
  window.addEventListener('scroll', () => {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollSpyELement = document.querySelectorAll('.services-tabs')

    scrollSpyELement.forEach(element => {
      const section = 'services-content'

      const elementOffsetTop = document.getElementById(section).offsetTop
      const elementOffsetBottom = elementOffsetTop + document.getElementById(section).offsetHeight - 300

      if (scrollPosition > elementOffsetTop && scrollPosition < elementOffsetBottom) {
        if (!element.classList.contains('show')) {
          element.classList.add('show')
        }
      }
      else {
        if (element.classList.contains('show'))
          element.classList.remove('show')
      }
    })

  })
}

function setIframePage(pageType) {
  const PAGES = {
    flatRent: '/flatRent.html',
    hostelRent: "/hostelRent.html",
    hotelRent: "/hotelRent.html",
    studHostelItem: "/studHostelItem.html",
    flatItem: "/flatItem.html",
  },
    frame = document.getElementById('page-frame')

  switch (pageType) {
    case 'flatRent':
      frame.src = PAGES.flatRent
      break;
    case 'hostelRent':
      frame.src = PAGES.hostelRent
      break;
    case 'hotelRent':
      frame.src = PAGES.hotelRent
      break;
    case 'studHostelItem':
      frame.src = PAGES.studHostelItem
      break;
    case 'flatItem':
      frame.src = PAGES.flatItem
      break;

    default:
      break;
  }
}