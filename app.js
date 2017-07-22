/* LocalStorage */

const db = window.localStorage
let ndate = parseInt(db.getItem('ndate')) || 0

/* Utilities */

function getRandomEmojiByType (ty) {
  let emojis

  switch (ty) {
    case 'an':
      emojis = [
        '1f618',  // face throwing a kiss
        '1f496',  // sparkling heart
        '1f48c'   // love letter
      ]
      break
    case 'cd':
      emojis = [
        '1f6eb',  // airplance departure
        '1f5fb',  // Mount Fuji
        '1f4da'   // books
      ]
      break
    default:
      throw Error('Invalid date type')
  }

  return emojis[Math.floor(Math.random() * emojis.length)]
}

function getDaysDiffByType (date, ty) {
  let ret = new Date() - new Date(date)
  // XXX: !!-1 === true
  const isCountdown = !!['an', 'cd'].indexOf(ty)
  if (isCountdown) ret = -ret

  // NOTE: No error checking.
  return Math.floor(ret / 86400000)
}

/* Service Worker registration */

const sw = navigator.serviceWorker

if ('serviceWorker' in navigator) {
  sw.register('/sw.js', { scope: '/' })
    .then(_ => { console.log('Service Worker registered!') })
    .catch(err => { console.error(err) })
} else document.write('Service Worker not supported :(')

/* Elements */

const [
  dateModal,
  addBtn,
  dialogAddBtn,
  dialogCancelBtn,
  dateList
] = [
  'date-modal',
  'add-btn',
  'dialog-add-btn',
  'dialog-cancel-btn',
  'datelist'
].map(id => {
  return document.getElementById(id)
})

/* Event listeners */

dateModal.addEventListener('click', e => {
  const et = e.target
  if (et === dateModal || et === dialogCancelBtn) {
    dateModal.classList.remove('active')
  }
})

addBtn.addEventListener('click', _ => {
  dateModal.classList.add('active')
})

dialogAddBtn.addEventListener('click', _ => {
  const form = new FormData(document.getElementById('date-form'))
  const errmsg = document.getElementById('date-dialog__errmsg')

  if (!['input-date', 'input-title', 'input-type'].map(
    id => form.get(id)
  ).every(Boolean)) {
    errmsg.textContent = '日期信息尚未填写完整'
    return
  }

  const thatday = new Date(form.get('input-date'))
  const ty = form.get('input-type')

  if (getDaysDiffByType(thatday, ty) < 0) {
    errmsg.textContent = '纪念日日期应早于今日, 倒计时应处于未来'
    return
  }

  db.setItem(ndate, JSON.stringify({
    type: ty,
    date: thatday,
    title: form.get('input-title')
  }))

  ++ndate
  db.setItem('ndate', ndate)

  errmsg.textContent = ''
  window.location.reload()
})

/* Loading date list */

if (ndate) {
  for (let i = 0; i < ndate; ++i) {
    const d = JSON.parse(db.getItem(i))

    dateList.insertAdjacentHTML(
      'beforeend',
      `<li>
        <section>
          <p>&#x${getRandomEmojiByType(d.type)};</p>
          <h1>${d.title}</h1>
          <h2>&#x2014; ${getDaysDiffByType(d.date, d.type)} &#x2014;</h2>
          <small>DAYS TO/FROM</small>
          <p>${new Date(d.date).toLocaleDateString()}</p>
        </section>
      </li>`)
  }
} else {
  dateList.insertAdjacentHTML(
    'beforebegin',
    `<p style="margin-left: 1em; color: #666; font-style: italic">
      嗷, 还没有记录喔...
    </p>`)
}
