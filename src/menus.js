const { app, Menu, shell } = require( "electron" );
const isDev = require( "electron-is-dev" );

const buildMenu = () => {
    const template = [];

    //if running on macOS, create a standard App menu
    if( process.platform === "darwin" ){
        template.push( {
            label: app.getName(),
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services", submenu: [] },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" }
            ]
        } );
    }
    //create an edit menu
    template.push( {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "pasteandmatchstyle" },
            { role: "delete" },
            { role: "selectall" }
        ]
    } );

    //help menu
    template.push( {
        role: "help",
        submenu: [ {
            label: "Take me to Google",
            accelerator: "CmdOrCtrl+G",
            click() {
                shell.openExternal( "https://google.com" );
            }
        } ]
    } );

    //if running in dev mode, enable reload, devtools, etc
    if( isDev ) {
        template.push( {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forcereload" },
                { role: "toggledevtools" },
                { type: "separator" },
                { role: "resetzoom" },
                { role: "zoomin" },
                { role: "zoomout" },
                { type: "separator" },
                { role: "togglefullscreen" }
            ]
        } );
    }
    //build a menu from the array of menu items
    const menu = Menu.buildFromTemplate( template );

    //set
    Menu.setApplicationMenu( menu );
};

module.exports = {
    buildMenu
};