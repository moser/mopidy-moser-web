import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Mopidy from "mopidy"

const mopidy = new Mopidy({webSocketUrl: "ws://192.168.1.222:6680/mopidy/ws"})
mopidy.connect()
//window.mopidy = mopidy

mopidy.on("state", console.log);
mopidy.on("event", console.log);

type Station = {
  name:string;
  uri:string;
}

const Stations: Station[]= [
  {name:"Rock Antenne", uri:"https://stream.rockantenne.de/rockantenne/stream/mp3"},
  {name:"Bayern 1", uri:"https://dispatcher.rndfnk.com/br/br1/nbopf/mp3/mid"},
]

function App() {
  const [volume, setVolume] = useState(0)
  const [trackName, setTrackName] = useState("")
  const [streamTitle, setStreamTitle] = useState("")

  const play = (uri:string) => {
    setTrackName("")
    setStreamTitle("")
    mopidy.tracklist?.clear()
      .then(() => mopidy.tracklist?.add({uris: [uri]}))
      .then(() => mopidy.playback?.play({}))
  }

  const updateVolume = (evt : React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(evt.target.value)
    mopidy.mixer?.setVolume({volume: vol})
    setVolume(vol)
  }

  useEffect(() => {
    mopidy.on("event:trackPlaybackStarted", (evt) => setTrackName(evt.tl_track.track.name))
    mopidy.on("event:streamTitleChanged", (evt) => setStreamTitle(evt.title))
    mopidy.on("event:volumeChanged", (evt) => setVolume(evt.volume))
    mopidy.on("state:online", () => {
      mopidy.playback?.getCurrentTrack().then((track) => setTrackName(track?.name || ""))
      mopidy.playback?.getStreamTitle().then((title) => setStreamTitle(title || ""))
      mopidy.mixer?.getVolume().then((vol) => setVolume(vol || 0))
    })
  }, [])


  return (
    <div className="App">
      <div className="card">
        {Stations.map((station) => 
          (<button onClick={() => play(station.uri)} key={station.uri}>
              {station.name}
            </button>
          )
        )
        }
      </div>
      <div className="card">
        <h3>{trackName}</h3>
        <h4>{streamTitle}</h4>
      </div>
      <div className="card">
        <input 
          id="typeinp" 
          type="range" 
          min="0" max="100" 
          value={volume} 
          onChange={updateVolume}
          step="1"/>
      </div>
    </div>
  )
}

export default App
