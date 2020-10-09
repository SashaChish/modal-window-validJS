const $ = {}

const options = {
  title: 'Modal title',
  closeble: true,
  content: `
      <p>Lorem ipsum dolor sit.</p>
      <p>Lorem ipsum dolor sit.</p>
    `,
  width: '600px;',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        console.log('prim clicked')
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        console.log('danger clicked')
      }
    }
  ]
}