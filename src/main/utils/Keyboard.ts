class Keyboard {
    private keyUpEvents: Map<Key, Function[]>;

    constructor() {
        this.keyUpEvents = new Map<Key, Function[]>();

        window.onkeyup = (e) => {
            let key: Key = keyCodeMap.get(e.code);
            let callbacks = this.keyUpEvents.get(key);
            if (callbacks) {
                callbacks.forEach(callback => {
                    if (callback) {
                        callback();
                    }
                })
            }
        };
    }

    public addKeyUpEvent(key: Key, callback: Function) {
        let callbacks = this.keyUpEvents.get(key);
        if (callbacks == null) {
            callbacks = [];
            this.keyUpEvents.set(key, callbacks);
        }
        callbacks.push(callback);
    }

    public addKeyUpEvents(events: ([Key, Function])[]) {
        events.forEach((event) => {
            this.addKeyUpEvent(event[0], event[1]);
        });
    }
}

enum Key {
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    Equal = 'Equal',
    Minus = 'Minus',
    Space = 'Space',
    KeyP = 'KeyP',
}

const keyCodeMap = new Map<string, Key>([
    ['ArrowLeft', Key.ArrowLeft],
    ['ArrowRight', Key.ArrowRight],
    ['ArrowUp', Key.ArrowUp],
    ['ArrowDown', Key.ArrowDown],
    ['Equal', Key.Equal],
    ['Minus', Key.Minus],
    ['Space', Key.Space],
    ['KeyP', Key.KeyP],
]);

const singleton: Keyboard = new Keyboard();

export const keyboard = singleton;
export const key = Key;
