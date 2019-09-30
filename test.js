
function wake(time){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(100)
let p2 = wake(200)
let p3 = wake(300)
let p4 = wake(400)
let p5 = wake(500)
let p6 = wake(1500)
console.log(p1)

Promise.all([p1, p2, p3, p4, p5, p6]).then((result) => {
  console.log(typeof result[0])
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})

/**

*/