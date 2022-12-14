var portAudio = require('naudiodon');
var fs = require('fs');

const DEV_AIRPODS = 'AirPods Max de Matias'
const DEV_VB_CABLE = 'VB-Cable'
const DEV_SPEAKERS = 'MacBook Pro Speakers'
const DEV_MIC_MAC = 'MacBook Pro Microphone'

const INPUT_DEVICE_NAME = DEV_VB_CABLE
const OUTPUT_DEVICE_NAME = DEV_AIRPODS

const inputDevice = portAudio.getDevices().find(device => device.name === INPUT_DEVICE_NAME && device.maxInputChannels > 0)
const outputDevice = portAudio.getDevices().find(device => device.name === OUTPUT_DEVICE_NAME && device.maxOutputChannels > 0)

var ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: inputDevice.id, // Use -1 or omit the deviceId to select the default device
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error

    },
    outOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: outputDevice.id, // Use -1 or omit the deviceId to select the default device
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
    }
  });



// var ws = fs.createWriteStream('rawAudio2.raw');

console.log('xx', ai)

// ai.pipe(ws);
ai.start();

ai.on('close', buf => console.log('close',buf));
ai.on('data', buf => console.log('data',buf));
ai.on('error', buf => console.log('error', buf));

// process.on('SIGINT', () => {
//     console.log('Received SIGINT. Stopping recording.');
//     ai.quit();
//   });