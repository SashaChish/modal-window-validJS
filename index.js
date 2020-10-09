let fruits = [
  {id: 1, title: 'An apple', price: 20, img: 'https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256263__340.jpg'},
  {id: 2, title: 'An bananas', price: 30, img: 'https://cdn.pixabay.com/photo/2016/01/03/17/59/bananas-1119790__340.jpg'},
  {id: 3, title: 'An pomegranate', price: 60, img: 'https://cdn.pixabay.com/photo/2018/05/08/20/19/pomegranate-3383814__340.jpg'}
]

const toHTML = fruit => `
  <div class="col">
    <div class="card" style="width: 18rem;">
      <img src="${fruit.img}" class="card-img-top" alt=${fruit.title}>
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <p class="card-text">eat ${fruit.title.split(' ')[1]}, they are healthy and tasty.</p>
        <div class="card-btn-container">
          <a href="#" class="btn first btn-primary" data-btn="price" data-id=${fruit.id}>more info</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>delete</a>
        </div>
      </div>
    </div>
  </div>
`

function createCards(fruits) {  
  const cards = fruits.map(toHTML).join('')
  const html = `
    <div class="row">${cards}</div>
  `
  const fruitsContainer = document.querySelector('#fruits')
  fruitsContainer.innerHTML = html
}

createCards(fruits)

const priceModal = $.modal({
  title: 'Product price',
  closeble: true,
  width: '600px;',
  footerButtons: [
    {
      text: 'Close',
      type: 'primary',
      handler() {
        priceModal.close()
      }
    },
  ]
})

document.addEventListener('click', e => {
  e.preventDefault()

  const { btn: btnType, id} = e.target.dataset
  const fruit = fruits.find(f => f.id === +id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>${fruit.title} price: <strong>${fruit.price}$</strong></p>
    `)

    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You remove the fruit <strong>${fruit.title}$</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== +id)
      createCards(fruits)
    }).catch(() => {
      console.log('Cancel')
    })
  }
})