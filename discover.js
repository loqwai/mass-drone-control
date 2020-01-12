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
  noble.startScanning();

  noble.on('discover', peripheral => {
    if (!Drone.isDronePeripheral(peripheral)) {
      return; // not a rolling spider
    }

    var details = {
      name: peripheral.advertisement.localName,
      uuid: peripheral.uuid,
      rssi: peripheral.rssi
    };

    knownDevices.push(details);
    console.log(knownDevices.length + ': ' + details.name + ' (' + details.uuid + '), RSSI ' + details.rssi);
  });
}