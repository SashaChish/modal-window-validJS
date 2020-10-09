// function _eventListener($modal, event, selectorList, create = true) {
//   for (selector of selectorList) {
//     const $node = $modal.querySelector(selector)
    
//     if ($node) {
//       create ? 
//         $node.addEventListener(event, e => {
//             e.target === $node && this.close()
//           }) :
//         $node.removeEventListener(event, this.close)
//     }
//   } 
// }


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
        <footer class="modal-footer">
          <button type="button">Ok</button>
          <button type="button">Cancel</button>
        </footer>
      </div>
    </div>
  `)
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
      }, ANIMATION_SPEED)
    },
    // destroy() {
    //   // _eventListener.call(this, $modal, 'click', ['.modal-close', '.modal-overlay'], false)

    //   $modal.remove()
    // },
  }

  const listener = e => {
    if (e.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  // _eventListener.call(modal, $modal, 'click', ['.modal-close', '.modal-overlay'])
  return Object.assign({}, modal, {
    destroy() {
      $modal.remove()
      $modal.removeEventListener('click', listener)
      // _eventListener.call(this, $modal, 'click', ['.modal-close', '.modal-overlay'])
      destroyed = true
    },
    setContent(html = '') {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}