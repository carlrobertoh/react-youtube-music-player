export var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["UNSTARTED"] = -1] = "UNSTARTED";
    PlayerState[PlayerState["ENDED"] = 0] = "ENDED";
    PlayerState[PlayerState["PLAYING"] = 1] = "PLAYING";
    PlayerState[PlayerState["PAUSED"] = 2] = "PAUSED";
    PlayerState[PlayerState["BUFFERING"] = 3] = "BUFFERING";
    PlayerState[PlayerState["CUED"] = 5] = "CUED";
})(PlayerState || (PlayerState = {}));
//# sourceMappingURL=types.js.map