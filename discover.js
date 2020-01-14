'use strict';

var Drone = require('rolling-spider');
var noble = require('@icanos/noble');
var knownDevices = [];

if (noble.state === 'poweredOn') {
  start();
} else {
  noble.on('stateChange', start);
}

function start () {
  console.log('starting')
  var badCount = 0;
  noble.startScanning();

  noble.on('discover', peripheral => {
    var details = {
      name: peripheral.advertisement.localName,
      uuid: peripheral.uuid,
      rssi: peripheral.rssi
    };
    if (!Drone.isDronePeripheral(peripheral)) {
      badCount++
      return; // not a rolling spider
    }

    knownDevices.push(details);
    console.log(knownDevices.length + ': ' + details.name + ' (' + details.uuid + '), RSSI ' + details.rssi);
  });
}