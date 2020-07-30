<template>
  <div id="app">
    <h1>Performance</h1>
  </div>
</template>

<script>
import JitsiMeetJS from '@lyno/lib-jitsi-meet';
import $ from 'jquery';
import options from './options/config';

window.$ = $;

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);

const connection = new JitsiMeetJS.JitsiConnection(null, null, options);

function onConnectionSuccess() {
  console.log("onConnectionSuccess", arguments);
  const room = connection.initJitsiConference("my-secret-conference", {});
  room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
  room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
    console.log("onConferenceJoined", arguments);
    JitsiMeetJS.createLocalTracks({
      devices: ['video', 'audio']
    }).then((tracks) => {
      console.log("onLocalTracks", tracks);
      tracks.forEach(track => {
        room.addTrack(track);
      })
    }).catch(error => {
          console.error("There was an error creating the local tracks:", error);
        }
    );
  });
  room.join();
}

function onConnectionFailed() {
  console.log("onConnectionFailed", arguments);
}

function disconnect() {
  console.log("disconnect", arguments);
}

connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();


function onRemoteTrack() {
  console.log("onRemoteTrack", arguments);
}


export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
