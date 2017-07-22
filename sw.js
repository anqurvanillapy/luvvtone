const VERSION = '0.1.0'
const MANIFEST = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js'
]

this.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => {
      return c.addAll(MANIFEST)
    })
  )
})

this.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).catch(_ => {
    return fetch(e.request)
  }).then(res => {
    caches.open(VERSION).then(c => { c.put(e.request, res) })
    return res.clone()
  }))
})
