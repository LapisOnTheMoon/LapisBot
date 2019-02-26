const { TwitchOnlineTracker } = require('twitchonlinetracker')
const tracker = new TwitchOnlineTracker({
  client_id: "lilw175xjxlil562b3z66an9d46poi", // used for api requests
  track: ['antichristlouis'], // all the channels you want to track
  pollInterval: 30, // how often in between polls in seconds. default 30
  debug: true, // whether to debug to console
  start: true // whether to start immediately. if you don't use this, you must call .start() later
})

// Listen to live event, it returns StreamData
tracker.on('live', streamData => {
  console.log(`${streamData.user_name} just went live!`)
})

// Make sure you listen for errors
tracker.on('error', error => console.error)
