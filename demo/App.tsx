import React from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoStop,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

import { useYoutube } from "../src/useYoutube";
import { PlayerState } from "../src/types";

import "./styles.css";

const App = () => {
  const { playerDetails, actions } = useYoutube({
    id: "RDgXWYOF0UhCk",
    type: "playlist",
  });

  const renderVolumeIcon = () => {
    if (playerDetails.volume === 0) {
      return <IoVolumeMute />;
    }
    if (playerDetails.volume <= 30) {
      return <IoVolumeLow />;
    }
    if (playerDetails.volume <= 60) {
      return <IoVolumeMedium />;
    }
    return <IoVolumeHigh />;
  };

  return (
    <div className="app">
      <h1>react-youtube-music-player</h1>
      <div className="video-title">{playerDetails.title}</div>
      <div className="player-controls">
        <button onClick={actions.previousVideo}>
          <IoPlaySkipBack />
        </button>
        {playerDetails.state === PlayerState.PLAYING ? (
          <button className="emphasised" onClick={actions.pauseVideo}>
            <IoPause />
          </button>
        ) : (
          <button className="emphasised" onClick={actions.playVideo}>
            <IoPlay />
          </button>
        )}
        <button onClick={actions.stopVideo}>
          <IoStop />
        </button>
        <button onClick={actions.nextVideo}>
          <IoPlaySkipForward />
        </button>
        <div className="volume-control">
          {renderVolumeIcon()}
          <input
            type="range"
            value={playerDetails.volume}
            min={0}
            max={100}
            onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
