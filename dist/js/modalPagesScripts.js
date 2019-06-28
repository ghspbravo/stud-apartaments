/*!
 * stud-apartaments v0.0.1
 * Service to help students to find home.
 * (c) 2019 spBRAVO
 * MIT License
 * http://link-to-your-git-repo.com
 */

document.addEventListener('DOMContentLoaded', (function mainScripts() {
  attachModalEvents()
  attachFormSubmitEvents()
}))


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