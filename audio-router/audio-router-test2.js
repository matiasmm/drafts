// Inspired in https://github.com/Streampunk/naudiodon/issues/13#issuecomment-384928879

var portAudio = require('naudiodon');
var fs = require('fs');

const DEV_AIRPODS = 'AirPods Max de Matias'
const DEV_BLACKHOLE = 'BlackHole 2ch'
const DEV_VB_CABLE = 'VB-Cable'
const DEV_SPEAKERS = 'MacBook Pro Speakers'
const DEV_MIC_MAC = 'MacBook Pro Microphone'

const INPUT_DEVICE_NAME = DEV_BLACKHOLE
const OUTPUT_DEVICE_NAME = DEV_AIRPODS

const inputDevice = portAudio.getDevices().find(device => device.name === INPUT_DEVICE_NAME && device.maxInputChannels > 0)
const outputDevice = portAudio.getDevices().find(device => device.name === OUTPUT_DEVICE_NAME && device.maxOutputChannels > 0)

var ao = new portAudio.AudioIO({    
  outOptions:   {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    deviceId: outputDevice.id
  }
});

var ai = new portAudio.AudioIO({    
  inOptions:   {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    deviceId: inputDevice.id
  }
});



// ai.pipe(ao); //  produces audio overflow

/** INPUT events */
ai.on("data", chunk => {
  //console.log(chunk)
   ao.write(chunk) 
});

ai.start();


/** Output events */
ao.on("error", chunk => {
  console.error("ERROR OUTPUT", chunk) 
});
ao.start();




process.on('SIGINT', () => {
    console.log('Received SIGINT. Stopping recording.');
    ai.quit();
    console.log('Stopped AI');
    ao.quit()
    console.log('Stopped AO');
  });