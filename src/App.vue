<template>
  <div id="app">
    <h1>Performance</h1>
    <button @click="connect">Connect</button>
    <video v-for="track in videoTracks" :key="`track-${track.getId()}`" :ref="track.getId()" autoplay />
    <audio v-for="track in audioTracks" :key="`track-${track.getId()}`" :ref="track.getId()" autoplay />
  </div>
</template>

<script>
import { connect, createAndJoinRoom, createTracksAndAddToRoom } from './utils/jitsiUtils';
import JitsiMeetJS from '@lyno/lib-jitsi-meet';

export default {
  name: 'App',

  data() {
    return {
      videoTracks: [],
      audioTracks: []
    }
  },

  methods: {
    addTrack(track) {
      if (track.getType() === 'video') {
        this.videoTracks.push(track);
      } else if (track.getType() === 'audio') {
        this.audioTracks.push(track);
      }
      this.$nextTick().then(() => {
        track.attach(this.$refs[track.getId()][0]);
      })
    },

    connect() {
      const roomName = 'my-secret-conference';
      connect(roomName).then(connection => {
        return createAndJoinRoom(connection, roomName);
      })
      .then(room => {
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, track => this.addTrack(track));
        createTracksAndAddToRoom(room);
      })
      .catch(error => console.error(error));
    }
  },
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
