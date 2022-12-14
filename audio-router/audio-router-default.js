/***
 * it always routes the audio to the default output device
 */

var portAudio = require('naudiodon');
var fs = require('fs');

var { onChangeOutput } = require('./helper')

const DEV_AIRPODS = 'AirPods Max de Matias'
const DEV_BLACKHOLE = 'BlackHole 2ch'
const DEV_VB_CABLE = 'VB-Cable'
const DEV_SPEAKERS = 'MacBook Pro Speakers'
const DEV_MIC_MAC = 'MacBook Pro Microphone'

const INPUT_DEVICE_NAME = DEV_BLACKHOLE
const OUTPUT_DEVICE_NAME = DEV_AIRPODS

const inputDevice = portAudio.getDevices().find(device => device.name === INPUT_DEVICE_NAME && device.maxInputChannels > 0)
const outputDevice = portAudio.getDevices().find(device => device.name === OUTPUT_DEVICE_NAME && device.maxOutputChannels > 0)

var ao = null

var ai = new portAudio.AudioIO({    
  inOptions:   {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    deviceId: inputDevice.id,
    closeOnError: false
  }
});



/** INPUT events */
ai.on("data", chunk => {
  //console.log(chunk)
  if (ao) {
    ao.write(chunk) 
  }
});
ai.start();


/** Output events */
const interval = onChangeOutput((defaultDeviceId) => {

  console.log('Changing default device', defaultDeviceId)

  if (ao) {
    ao = null
  }


 const deviceDefault =  portAudio.getDevices().find(device => device.id === defaultDeviceId && device.maxOutputChannels > 0)

  console.log(deviceDefault, "DEFAULT DEVICE OUT")

  ao = new portAudio.AudioIO({    
    outOptions:   {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 16000,
      deviceId: defaultDeviceId,
      closeOnError: false
    }
  });
  
  ao.on("error", chunk => {
    console.error("ERROR OUTPUT", chunk) 
  });
  ao.start();
})





process.on('SIGINT', () => {
    console.log('Received SIGINT. Stopping recording.');
    ai.quit();
    console.log('Stopped AI');
    ao.quit()
    console.log('Stopped AO');
  });