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

// const heartMsgArr = [
//   '#\nLOVE',
//   'Smile',
//   'Me +\nYou',
//   'In The\nMood',
//   'Heart\nThrob',
//   '143',
//   'OOH\nLa La',
//   'Crazy\n4 U',
//   'Wink\nWink',
//   'Sweet\nStuff',
//   'Soul\nMate',
//   'Sweet\nTalk',
//   'True\nLove',
//   '#\nLOVE',
//   'LIVE N\nLOVE',
//   'Be\nHappy',
//   'Giggle',
//   'Angle',
//   'Hug\nMe',
//   'YOU\n& I',
//   'Miss\nYou',
//   'My\nLove',
//   'Say\nYES',
// ]

const heartMsgArr = [
  'Wink\nWink',
  '你是踩碎星光\n落入我梦境的\n一袋幻想',
  '山野千里,你是我\n藏在星星里的浪漫',
  '我只在做一件事的\n时候想你,那就是呼吸',
  '我可能是盐吃多了,\n闲的总是想你',
  '今天的天气很好\n适合打打闹闹\n更适合亲亲抱抱',
  '你算哪只小猪猪\n在这里嘟嘟嘟',
  '你去银河偷点星星\n做我宇宙飞船的燃料',
  '一起看日出吧！',
  '喜欢你的时候\n总恨不得\n日夜翻书三百章',
  '我超有趣的\n我可有意思了\n你看看我吧',
  '煎雪落雨\n心上是你\n欢喜躲在眉目里',
  '请你马上从我眼前\n消失，来我心里！',
  '林深时见鹿\n海蓝时见鲸\n梦醒时见你',
  '生命太短暂\n不能空手而归',
  '等风来\n不如追风去',
  '南风知我意\n吹梦到西洲',
  '浮世三千\n吾爱有三\n日，月与卿',
  '日为朝\n月为暮\n卿为朝朝暮暮',
  '独见了你\n见花开笑颜\n见海湛如眸',
  '情不知所起\n一往而深',
  '我不知道我有多喜欢你\n但如果是去见你\n我一定是用跑的',
  '相见亦无事情\n别来常忆君',
  '白茶清欢无别事\n我在等风也等你'
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
    // c.fillStyle = "#f00"
    c.fillStyle = "#800080"
    // c.fillStyle = "#9932CC"
    c.font = `${this.scale * 12}px Arial, Helvetica, sans-serif`
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