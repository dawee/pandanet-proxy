var _ = require('underscore'),
    PandanetClient = require('pandanet-client');

function Bridge(socket) {
    _.bindAll(this);
    this.socket = socket;
    this.pandanetClient = new PandanetClient({
        onmatchrequest: this.onMatchRequest
    });
};

Bridge.prototype.start = function () {
    this.socket.once('auth:sending', this.onAuthSent);
    this.socket.emit('auth:request');
};

Bridge.prototype.onAuthSent = function (data) {
    this.pandanetClient.connect({login: data.login, password: data.password, success: this.onAuthSuccess});
};

/* Pandanet commands */

Bridge.prototype.emitGamesList = function () {
    this.pandanetClient.listGames({success: this.onGamesListReceived});
};

Bridge.prototype.emitPlayersList = function () {
    this.pandanetClient.listPlayers({success: this.onPlayersListReceived});
};

/* Pandanet event listeners */

Bridge.prototype.onAuthSuccess = function () {
    this.socket.on('games:list:request', this.emitGamesList);
    this.socket.on('players:list:request', this.emitPlayersList);
    this.socket.emit('auth:success');
};

Bridge.prototype.onMatchRequest = function (request) {
    this.socket.emit('match:request', {request: request});
};

Bridge.prototype.onMatchStart = function (board) {
    this.socket.emit('match:start', {board: board});
};

Bridge.prototype.onGamesListReceived = function (games) {
    this.socket.emit('games:list:success', {games: games});
};

Bridge.prototype.onPlayersListReceived = function (players) {
    this.socket.emit('players:list:success', {players: players});
};

module.exports = Bridge;