# react-youtube-music-player

[![NPM](https://img.shields.io/npm/v/react-youtube-music-player.svg)](https://www.npmjs.com/package/react-youtube-music-player) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install react-youtube-music-player
```

## Usage

```tsx
import React from "react";
import { useYoutube } from "react-youtube-music-player";

export const ExamplePlayer = () => {
  const { playerDetails, actions } = useYoutube({
    id: "RDLbqzhXWl33U",
    type: "playlist",
  });

  return (
    <>
      <div id="youtube-player-RDLbqzhXWl33U" style={{ display: "none" }} />
      ...
    </>
  );
};
```

### Input props

| Prop     | Description                                                                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`     | The id of a video or playlist to play                                                                                                                            |
| `type`   | Set `video` or `playlist` depending on the id                                                                                                                    |
| `events` | `onReady`: Called when media is initialized and ready to play <br/> `onStateChanged`: Called when video state changed <br /> `onError`: Called when error occurs |

### Return props
#### State of the player: `playerDetails`

| Prop          | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `id`          | The id of currently playing video                                                                  |
| `state`       | Current state of the media - UNSTARTED(-1), ENDED(0), PLAYING(1), PAUSED(2), BUFFERING(3), CUED(5) |
| `title`       | Title of the video                                                                                 |
| `duration`    | Duration of the media, in seconds                                                                  |
| `currentTime` | Number of seconds that have been played                                                            |
| `volume`      | Volume of the player                                                                               |

#### Internal player functions: `actions`

| Function name                     | Description                                 |
| --------------------------------- | ------------------------------------------- |
| `playVideo()`                     | Play video                                  |
| `stopVideo()`                     | Stop video                                  |
| `pauseVideo()`                    | Pause video                                 |
| `nextVideo()`                     | Play next video                             |
| `previousVideo()`                 | Play previous video                         |
| `setVolume(volume)`               | Set the volume of the player, between 0-100 |
| `seekTo(seconds, allowSeekAhead)` | Seek to the given number of seconds         |
