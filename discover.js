'use strict'

var Drone = require('rolling-spider')

console.log('starting')
connectToDrone()


function connectToDrone() {
  
  console.log("we're connecting")
  const d = new Drone()
  d.connect(function () {
    console.log('got a connection')
    d.setup(function () {
      console.log('got a setup')
      d.startPing()
      d.takeOff()
    })
  })
}