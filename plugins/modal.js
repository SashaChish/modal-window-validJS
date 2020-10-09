Element.prototype.appendAfter = function(node) {
  node.parentNode.insertBefore(this, node.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
  if (!buttons.length) {
    return document.createElement('div')
  }

  const footer = document.createElement('footer')
  footer.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || noop

    footer.appendChild($btn)
  })

  return footer
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px'
  const modal = document.createElement('div')
  modal.classList.add('amodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <header class="modal-header">
          <span class="modal-title">${options.title || ''}</span>
          ${options.closeble ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </header>
        <article class="modal-body" data-content>
          ${options.content || ''}
        </article>
      </div>
    </div>
  `)

  const footer = _createModalFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))

  document.body.appendChild(modal)

  return modal
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200
  let $modal = _createModal(options)
  let closing = false
  let destroyed = false
  
  const modal = {
    open() {
      if (destroyed) return

      !closing && $modal.classList.add('open')  
    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')

      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
        
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
      }, ANIMATION_SPEED)
    },
  }

  const listener = e => {
    if (e.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign({}, modal, {
    destroy() {
      $modal.remove()
      $modal.removeEventListener('click', listener)
  
      destroyed = true
    },
    setContent(html = '') {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}