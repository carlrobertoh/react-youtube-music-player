import { useEffect, useState } from "react";
import { PlayerState } from "./types";
let player;
const loadApi = (id, options) => {
    const iframe = document.createElement("div");
    iframe.id = `youtube-player-${id}`;
    iframe.style.setProperty("display", "none");
    document.body.appendChild(iframe);
    if (document.querySelector("[data-youtube]")) {
        player = new YT.Player(`youtube-player-${id}`, options);
        return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.dataset.youtube = "true";
    const firstScriptTag = document.getElementsByTagName("head")[0];
    firstScriptTag.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player(`youtube-player-${id}`, options);
    };
};
export const useYoutube = (props) => {
    const getPlayerOptions = (type) => ({
        ...(type === "playlist"
            ? {
                playerVars: {
                    listType: "playlist",
                    list: props.id,
                },
            }
            : { videoId: props.id }),
        events: {
            onReady: (event) => {
                setState(event.target);
                props.events?.onReady?.(event);
            },
            onStateChange: (event) => {
                setState(event.target);
                props.events?.onStateChange?.(event);
            },
            onError: (event) => {
                props.events?.onError?.(event);
            },
        },
    });
    const [playerDetails, setPlayerDetails] = useState({
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
    const setState = ({ playerInfo: { videoData, ...playerInfo }, }) => {
        setPlayerDetails({
            id: videoData.video_id,
            state: playerInfo.playerState,
            title: videoData.title,
            duration: playerInfo.duration,
            volume: playerInfo.volume,
            currentTime: playerInfo.currentTime,
        });
    };
    const proxy = (functionName, args = []) => {
        if (typeof player?.[functionName] === "function") {
            // @ts-ignore
            player[functionName].call(player, ...args);
        }
        else {
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
            setVolume: (volume) => {
                setPlayerDetails((prevState) => ({ ...prevState, volume }));
                proxy("setVolume", [volume]);
            },
            seekTo: (seconds, allowSeekAhead) => {
                setPlayerDetails((prevState) => ({
                    ...prevState,
                    currentTime: seconds,
                }));
                proxy("seekTo", [seconds, allowSeekAhead]);
            },
        },
    };
};
//# sourceMappingURL=useYoutube.js.map