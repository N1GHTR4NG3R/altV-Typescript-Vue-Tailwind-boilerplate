import * as alt from 'alt-client';

// Declare usage variables
let CLI;
let CLIReady = false;
let cursor = 0;
let onEvents = [];

// Create 1 Vue CLI Instance, set focus
alt.on('webview:init', () => {
    /**
     * Switch webview URL too below for production:
     * http://resource/client/html/vue/index.html#/
     */
    CLI = new alt.WebView('http://localhost:8080/#/');
    CLI.on('webview:initiated', () => {
        setReady();
        focus();
        showCursor(true);
        alt.emit('webview:initiated');
    });
});

function setReady() {
    CLIReady = true;
    CLI.focus();

    // Queue events, then loop
    onEvents.forEach((event) => {
        CLI.on(event.eventName, event.handler);
    });
    onEvents = [];
}

/**
 * Webview event handler
 * @param {string} eventName name
 * @param {handler} handler parameters
 * @param {Array} parameters parameters
 */

export function on(eventName, handler) {
    if (!CLIReady) {
        onEvents.push({ eventName, handler });
    } else {
        CLI.on(eventName, handler);
    }
}

export function emit(eventName, ...parameters) {
    if (CLIReady) {
        CLI.emit(eventName, ...parameters);
    }
}
alt.onServer('webview.emit', emit);

const emitServer = (method, ...parameters) => {
    alt.emitServer(method, ...parameters);
};
on('emit-server', emitServer);

/**
 * Return webview to default
 */
export function close() {
    if (CLIReady) {
        alt.log('Closing Webview');
        CLI.emit('route:set', 'Home');
        unfocus();
    }
}

/**
 * Focus webview
 */
export function focus() {
    if (CLIReady) {
        CLI.focus();
    }
}

/**
 * Unfocus webview
 */
export function unfocus() {
    if (CLIReady) {
        CLI.unfocus();
    }
}

/**
 * @param {Boolean} value
 */
export function showCursor(value) {
    if (value) {
        cursor += 1;
        alt.showCursor(true);
        return;
    }
    for (let i = 0; i < cursor; i++) {
        try {
            alt.showCursor(false);
        } catch (err) {
            throw err.name;
        }
    }
    cursor = 0;
}

/**
 * Get state of cursor
 * @return {Integer} State (0-1)
 */
export function getCursorState() {
    return cursor;
}
