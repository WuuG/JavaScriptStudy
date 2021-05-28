const a = import('./hello.js')
const btn = document.querySelector('#btn')

btn.addEventListener('click', res => {
  a.then(res => res.hello())
})