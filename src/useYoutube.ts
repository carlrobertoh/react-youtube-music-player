import { useEffect, useState } from "react";
import { PlayerDetails, PlayerState } from "./types";

interface Props {
  id: string;
  type: "playlist" | "video";
  events?: {
    onReady?: (event: YT.PlayerEvent) => void;
    onStateChange?: (event: YT.OnStateChangeEvent) => void;
    onError?: (event: YT.OnErrorEvent) => void;
  };
}

interface Actions {
  playVideo: () => void;
  stopVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  setVolume: (volume: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface YoutubeHook {
  playerDetails: PlayerDetails;
  actions: Actions;
}

let player: YT.Player;

const loadApi = (id: string, options: YT.PlayerOptions) => {
  if (document.querySelector("[data-youtube]")) {
    player = new YT.Player(`youtube-player-${id}`, options);
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.dataset.youtube = "true";
  const firstScriptTag: HTMLHeadElement =
    document.getElementsByTagName("head")[0];
  firstScriptTag.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player(`youtube-player-${id}`, options);
  };
};

export const useYoutube = (props: Props): YoutubeHook => {
  const getPlayerOptions = (type: "video" | "playlist"): YT.PlayerOptions => ({
    ...(type === "playlist"
      ? {
          playerVars: {
            listType: "playlist",
            list: props.id,
          },
        }
      : { videoId: props.id }),
    events: {
      onReady: (event: YT.PlayerEvent) => {
        setState(event.target);
        props.events?.onReady?.(event);
      },
      onStateChange: (event: YT.OnStateChangeEvent) => {
        setState(event.target);
        props.events?.onStateChange?.(event);
      },
      onError: (event: YT.OnErrorEvent) => {
        props.events?.onError?.(event);
      },
    },
  });

  const [playerDetails, setPlayerDetails] = useState<PlayerDetails>({
    id: "",
    state: PlayerState.UNSTARTED,
    title: "",
    duration: 0,
    currentTime: 0,
    volume: 0,
  });

  useEffect(() => {
    loadApi(props.id, getPlayerOptions(props.type));
    return () => {
      player.destroy();
    };
  }, [props.id, props.type]);

  const setState = ({
    playerInfo: { videoData, ...playerInfo },
  }: YT.Player) => {
    setPlayerDetails({
      id: videoData.video_id,
      state: playerInfo.playerState,
      title: videoData.title,
      duration: playerInfo.duration,
      volume: playerInfo.volume,
      currentTime: playerInfo.currentTime,
    });
  };

  const proxy = (functionName: keyof Actions, args: unknown[] = []) => {
    if (typeof player?.[functionName] === "function") {
      // @ts-ignore
      player[functionName].call(player, ...args);
    } else {
      console.error("Player not initialized.");
    }
  };

  return {
    playerDetails,
    actions: {
      playVideo: () => proxy("playVideo"),
      stopVideo: () => proxy("stopVideo"),
      pauseVideo: () => proxy("pauseVideo"),
      nextVideo: () => proxy("nextVideo"),
      previousVideo: () => proxy("previousVideo"),
      setVolume: (volume: number) => {
        setPlayerDetails((prevState) => ({ ...prevState, volume }));
        proxy("setVolume", [volume]);
      },
      seekTo: (seconds: number, allowSeekAhead: boolean) => {
        setPlayerDetails((prevState) => ({
          ...prevState,
          currentTime: seconds,
        }));
        proxy("seekTo", [seconds, allowSeekAhead]);
      },
    },
  };
};
