function patch() {
    console.log("[NoPlaylistFilter] Wrapping play function")
    let original = Spicetify.Platform.PlayerAPI.play;
    let wrapped = async function (e, t, n = {}) {
        if (e.playlistQueryOptions.filter != undefined) {
            delete e.playlistQueryOptions.filter;
        }
        let call = original.bind(this);
        await call(e, t, n);
    }
    Spicetify.Platform.PlayerAPI.play = wrapped;
}

async function wait_for_player_api() {
    while (Spicetify.Platform.PlayerAPI == undefined) {
        console.log("[NoPlaylistFilter] Waiting for PlayerAPI...")
        await new Promise(resolve => setTimeout(resolve, 100))
    }
}

wait_for_player_api().then(patch)