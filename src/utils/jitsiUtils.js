import JitsiMeetJS from '@lyno/lib-jitsi-meet';
import $ from 'jquery';
import options from '../options/config';

window.$ = $;

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);

export function createTracksAndAddToRoom(room) {
  JitsiMeetJS.createLocalTracks({
    devices: ['video', 'audio']
  }).then((tracks) => {
    tracks.forEach(track => {
      room.addTrack(track);
    });
  }).catch(error => {
      console.error('There was an error creating the local tracks:', error);
    }
  );
}

export function createAndJoinRoom(connection, roomName) {
  return new Promise((resolve) => {
    const room = connection.initJitsiConference(roomName, {});
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
      resolve(room);
    });
    room.join();
  });
}

export function connect(roomName) {
  return new Promise(((resolve, reject) => {
    let optionsWithRoom = { ...options };
    optionsWithRoom.serviceUrl = options.serviceUrl + `?room=${roomName}`;

    const connection = new JitsiMeetJS.JitsiConnection(null, null, optionsWithRoom);

    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
      resolve(connection);
    });
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => {
      reject('The connection failed.');
    });
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => {
      console.log("Connection disconnected");
    });

    connection.connect();
  }))
}
