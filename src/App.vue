<template>
  <div id="app">
    <h1>Performance</h1>
  </div>
</template>

<script>
import JitsiMeetJS from '@lyno/lib-jitsi-meet';
import $ from 'jquery';
window.$ = $;

import options from './options/config';

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);

const connection = new JitsiMeetJS.JitsiConnection(null, null, options);

function onConnectionSuccess() {
  console.log("onConnectionSuccess", arguments);
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
