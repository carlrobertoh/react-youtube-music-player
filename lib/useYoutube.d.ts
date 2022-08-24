/// <reference types="youtube" />
import { PlayerDetails } from "./types";
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
export declare const useYoutube: (props: Props) => YoutubeHook;
export {};
