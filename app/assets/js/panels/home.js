const { config, auth } = require('./assets/js/utils.js');
const { MCLaunch } = require('emc-core-luuxis');
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const launcher = new MCLaunch;
require('nw.gui').Window.get().showDevTools();
    

function play(){
    config.fetch().then(res => {
        if (auth.isLogged()){
            document.querySelector(".play-btn").disabled = true;


                let opts = {
                    url: res.game_url,
                    overrides: {
                        detached: false
                    },
                    authorization: auth.authenticator,
                    root: dataDirectory + "/" + res.dataDirectory,
                    version: res.game_version,
                    forge: res.forge_version,
                    checkFiles: true,
                    memory: {
                        max: "1G",
                        min: "1G"
                    }
                }
                launcher.launch(opts);


                launcher.on('debug', (e) => console.log("[DEBUG]" + e));
                launcher.on('data', (e) => console.log("[DATA]" + e));
                launcher.on('download-status', (e) => console.log("[DOWNLOAD][" + e.type + "] " + e.name + " (" + e.downloadedBytes + "/" + e.bytesToDownload + ")"));
                launcher.on('close', () => console.log("Le jeux est fermer."));
                launcher.on('error', (e) => console.log("[ERROR]" + e));
        } else {
          //  window.location.href = "../launcher.html"
        }
    })
}