import * as alt from 'alt-client';
import * as native from 'natives';

const localPlayer = alt.Player.local;

native.requestModel(native.getHashKey('mp_m_freemode'));
// native.requestModel(native.getHashKey('mp_m_freemode'));

alt.on('connectionComplete', () => {
    // Initiate webviews
    alt.emit('webview:init');

    // Set Ped Natives
    native.displayRadar(false);
    native.displayHud(false);
});
