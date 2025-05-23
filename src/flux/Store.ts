import { NavigateActionsType } from './Actions';
import { AppDispatcher, Action } from './Dispatcher';

export type State = {
    currentPath: string;
};

type Listener = (state: State) => void;


class Store {
    private _myState: State = {
        currentPath: ''
    }
    // componentes
    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this)); 
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case NavigateActionsType.NAVIGATE:
                if (action.payload?.path) {
                    this._myState = {
                        ...this._myState,
                        currentPath: action.payload.path 
                    }
                    this._emitChange();
                }
                break;
        }

        // en localStorage
        this.persist();
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }
    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState()); 
    }
    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    persist(): void {
        localStorage.setItem('flux:state', JSON.stringify(this._myState));
    }

    load(): void {
        const persistedState = localStorage.getItem('flux:state');
        if (persistedState) {
            this._myState = JSON.parse(persistedState);
            this._emitChange(); 
        }
    }

}

export const store = new Store();