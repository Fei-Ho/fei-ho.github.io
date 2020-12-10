// set canvas equal to screen size
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// globals
const c = canvas.getContext('2d')
const maxScale = 1.2
const mouse = {
  x: undefined,
  y: undefined
}
const colorArray = [
  '#62eb93',
  '#f790b8',
  '#fff34f',
  '#d691e7',
  '#fe9d54',
  '#9ad1fe'
]
const heartMsgArr = [
  '#\nLOVE',
  'LIVE N\nLOVE',
  'BE\nHAPPY',
  'GIGGLE',
  'ANGEL',
  'ASK\nME',
  'QT\nPIE',
  'FIRST\nKISS',
  'HUG\nME',
  'LOVE\nBUG',
  'LOVE\nME',
  'I LOVE\nYOU',
  'MARRY\nME',
  'YOU\n& I',
  'MISS\nYOU',
  'MY\nLOVE',
  'SAY\nYES',
  'SMILE',
  'SOUL\nMATE',
  'SWEET\nTALK',
  'TRUE\nLOVE',
  'LET\'S\nKISS',
  'MELT\nMY <3',
  'SWEET\nSTUFF',
  'OCCUPY\nMY <3',
  'TEXT\nME',
  'TWEET',
  'WINK\nWINK',
  'BE\nMINE',
  'CRAZY\n4 U',
  'OOH\nLA LA',
  'U R\nHOT',
  'CALL\nME',
  '143',
  'REAL\n<3',
  'KISS\nME',
  'HEART\nTHROB',
  'HOT\nDAWG',
  'IN THE\nMOOD',
  'ME +\nYOU',
  'YUM\nYUM',
  'YOU\nROCK'
]
// set total hearts based on screen area (max 600)
let totalHearts = Math.floor((window.innerHeight * window.innerWidth) / 1500)
if (totalHearts > 600) {
  totalHearts = 600
}
// add event listeners for mouse, touch, and screen resize
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
function startup() {
  canvas.addEventListener("touchstart", handleStart, false)
  canvas.addEventListener("touchend", handleEnd, false)
  canvas.addEventListener("touchcancel", handleCancel, false)
  canvas.addEventListener("touchmove", handleMove, false)
}
// handle touch events
let touch = null
function handleStart(evt) {
  evt.preventDefault()
  touch = evt.changedTouches[0]
  mouse.x = touch.clientX
  mouse.y = touch.clientY
}
function handleMove(evt) {
  evt.preventDefault()
  touch = evt.changedTouches[0]
  mouse.x = touch.clientX
  mouse.y = touch.clientY
}
function handleEnd(evt) {
  evt.preventDefault()
  touch = evt.changedTouches[0]
  mouse.x = undefined
  mouse.y = undefined
  touch = null
}
function handleCancel(evt) {
  evt.preventDefault()
  touch = evt.changedTouches[0]
  mouse.x = undefined
  mouse.y = undefined
  touch = null
}
// function to draw multiline text
function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y + lineHeight / 2);
    y += lineHeight;
  }
}
// <3
class Heart {
  constructor(x, y, dx, dy, scale) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.scale = scale
    this.minScale = scale
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.msg = heartMsgArr[Math.floor(Math.random() * heartMsgArr.length)]
  }
  draw() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.bezierCurveTo((0 * this.scale + this.x), (-3 * this.scale + this.y), (-5 * this.scale + this.x), (-15 * this.scale + this.y), (-25 * this.scale + this.x), (-15 * this.scale + this.y));
    c.bezierCurveTo((-55 * this.scale + this.x), (-15 * this.scale + this.y), (-55 * this.scale + this.x), (22.5 * this.scale + this.y), (-55 * this.scale + this.x), (22.5 * this.scale + this.y));
    c.bezierCurveTo((-55 * this.scale + this.x), (40 * this.scale + this.y), (-35 * this.scale + this.x), (62 * this.scale + this.y), (0 * this.scale + this.x), (80 * this.scale + this.y));
    c.bezierCurveTo((35 * this.scale + this.x), (62 * this.scale + this.y), (55 * this.scale + this.x), (40 * this.scale + this.y), (55 * this.scale + this.x), (22.5 * this.scale + this.y));
    c.bezierCurveTo((55 * this.scale + this.x), (22.5 * this.scale + this.y), (55 * this.scale + this.x), (-15 * this.scale + this.y), (25 * this.scale + this.x), (-15 * this.scale + this.y));
    c.bezierCurveTo((10 * this.scale + this.x), (-15 * this.scale + this.y), (0 * this.scale + this.x), (-3 * this.scale + this.y), (0 * this.scale + this.x), (20 * this.scale + this.y));
    c.fillStyle = this.color
    c.fill();
    c.fillStyle = "#f00"
    c.font = `${this.scale * 20}px Arial, Helvetica, sans-serif`
    c.textAlign = 'center'
    c.textBaseline = "top"
    fillTextMultiLine(c, this.msg, this.x, this.y)
  }
  update() {
    // bounces
    if (this.x + 55 * this.scale > innerWidth || this.x - 55 * this.scale < 0) {
      this.dx = -this.dx
    }
    if (this.y + 62 * this.scale > innerHeight || this.y - 62 * this.scale < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy
    // interactivity
    if (mouse.x - this.x < 40 && mouse.x - this.x > -40
      && mouse.y - this.y < 40 && mouse.y - this.y > -40) {
      if (this.scale < maxScale) {
        this.scale += .03
      }
    } else if (this.scale > this.minScale) {
      this.scale -= .03
    }
    // redraw changes
    this.draw()
  }
}
// create all random hearts
const heartArr = []
for (let i = 0; i < totalHearts; i++) {
  let scale = Number((Math.random() * .1 + .05).toFixed(2))
  let x = Math.random() * (innerWidth - scale * 55 * 2) + (scale * 55)
  let y = Math.random() * (innerHeight - scale * 62 * 2) + (scale * 62)
  let dx = (Math.random() - 0.5) * 2
  let dy = (Math.random() - 0.5) * 2
  heartArr.push(new Heart(x, y, dx, dy, scale))
}
// animate the hearts
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i of heartArr) {
    i.update()
  }
}
animate()
// check if browser supports service workers
// if so register service worker to go Offline First!
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => {console.log("This sweet service worker is registered!"); })
}