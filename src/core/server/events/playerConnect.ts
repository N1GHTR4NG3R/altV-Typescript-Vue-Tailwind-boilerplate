import * as alt from 'alt-server';
import cc from 'kleur';
// import { serverConfig } from '../configs/server';
import { defaultPlayer } from '../configs/player';

alt.on('playerConnect', (player) => {
    // if (!serverConfig.allowPlayerConnections) {
    // return player.kick('Server currently not accepting connections, Please try again in a few moments!');
    // }
    // Handle Player
    player.model = 'mp_m_freemode_01';
    player.spawn(defaultPlayer.loginSpawnPos.x, defaultPlayer.loginSpawnPos.y, defaultPlayer.loginSpawnPos.z, 0);

    console.log(cc.blue(`Name: ${cc.green(player.name)} has joined the server!`));
});
