/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import { createContext, useContext, useReducer } from 'react';
import { useImmer, useImmerReducer } from 'use-immer';
import * as tmi from 'tmi.js';

interface ISettings {
  channel: string;
  command: string;
  player1?: string;
  player2?: string;
  connectionStatus: string;
}

interface IMessages extends tmi.CommonUserstate {
  messages?: string;
}

type MessagesActionType = {
  type: 'ADD_MESSAGE';
  payload: {
    message: IMessages;
  };
};
type SettingsActionType =
  | {
      type: 'UPDATE_CHANNEL';
      payload: {
        channel: string;
      };
    }
  | {
      type: 'UPDATE_COMMAND';
      payload: {
        command: string;
      };
    }
  | {
      type: 'UPDATE_PLAYER1';
      payload: {
        player1: string;
      };
    }
  | {
      type: 'UPDATE_PLAYER2';
      payload: {
        player2: string;
      };
    }
  | {
      type: 'UPDATE_CONNECTION_STATUS';
      payload: {
        connectionStatus: string;
      };
    };

type ActionType =
  | {
      type: 'CONNECT';
      payload: {
        channel: string;
      };
    }
  | {
      type: 'DISCONNECT';
    };

export const TwitchContext = createContext<{
  twitch: tmi.Client;
  dispatchTwitch: React.Dispatch<ActionType>;
  settings: ISettings;
  dispatchSettings: React.Dispatch<SettingsActionType>;
  messages: IMessages[];
  dispatchMessages: React.Dispatch<MessagesActionType>;
}>({
  twitch: {} as tmi.Client,
  dispatchTwitch: () => null,
  settings: {} as ISettings,
  dispatchSettings: () => null,
  messages: {} as IMessages[],
  dispatchMessages: () => null,
});

export const TwitchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [twitch, dispatchTwitch] = useReducer(twitchReducer, initState());
  const [settings, dispatchSettings] = useImmerReducer(
    twitchSettingsReducer,
    initSettingsState()
  );

  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  const twitchListeners = (client: tmi.Client) => {
    console.log('count start of function:', client.listenerCount);

    client.on('message', (channel, userstate, message, self) => {
      // console.log('message', message);
      // console.log('message usertate', userstate);
      if (self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const receivedCommand = args.shift()?.toLowerCase();

      if (receivedCommand !== settings.command) return;
      dispatchMessages({
        type: 'ADD_MESSAGE',
        // eslint-disable-next-line object-shorthand
        payload: { message: { ...userstate, ...{ message: message } } },
      });
    });

    client.on('disconnected', (reason) => {
      dispatchSettings({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          connectionStatus: `Disconnected reason: ${reason}`,
        },
      });
    });
    console.log('count start of function:', client.listenerCount);
  };

  function twitchReducer(client: tmi.Client, action: ActionType) {
    switch (action.type) {
      case 'CONNECT': {
        if (
          client.readyState() === 'CLOSED' ||
          client.readyState() === 'CLOSING'
        ) {
          client
            .connect()
            // .then(() => twitchListeners(client))
            .then(() => client.join(action.payload.channel))
            .then(successConnectionMessage)
            .catch((error) => errorConnectionMessage(error));
        }
        if (
          client.readyState() === 'OPEN' &&
          client.getChannels().length === 0
        ) {
          client
            .join(action.payload.channel)
            .then(successConnectionMessage)
            .catch((error) => errorConnectionMessage(error));
        }

        return client;
      }

      case 'DISCONNECT': {
        console.log('Disconnecting...');
        client.removeAllListeners();
        client.getChannels().forEach((channel) => {
          console.log('existing channel:', channel);
          client.part(channel);
        });
        setTimeout(() => {
          client
            .disconnect()
            .then(() => {
              dispatchSettings({
                type: 'UPDATE_CONNECTION_STATUS',
                payload: {
                  connectionStatus: `Disconnected  - ${client.readyState()}`,
                },
              });
            })
            .catch((error) => errorConnectionMessage(error));
        }, 3000);

        return client;
      }
    }
  }

  async function successConnectionMessage() {
    dispatchSettings({
      type: 'UPDATE_CONNECTION_STATUS',
      payload: {
        connectionStatus: `Joined: ${settings.channel}`,
      },
    });
  }

  async function errorConnectionMessage(error: any) {
    console.log(twitch);

    dispatchSettings({
      type: 'UPDATE_CONNECTION_STATUS',
      payload: {
        connectionStatus: `Disconnected: ${error}`,
      },
    });
  }

  function twitchSettingsReducer(state: ISettings, action: SettingsActionType) {
    switch (action.type) {
      case 'UPDATE_CHANNEL': {
        state.channel = action.payload.channel;
        return state;
      }
      case 'UPDATE_COMMAND': {
        // twitch.removeAllListeners('message');
        state.command = action.payload.command;
        return state;
      }

      case 'UPDATE_CONNECTION_STATUS': {
        state.connectionStatus = action.payload.connectionStatus;
        return state;
      }

      case 'UPDATE_PLAYER1': {
        state.player1 = action.payload.player1;
        return state;
      }
      case 'UPDATE_PLAYER2': {
        state.player2 = action.payload.player2;
        return state;
      }
    }
  }

  return (
    <TwitchContext.Provider
      value={{
        twitch,
        dispatchTwitch,
        settings,
        dispatchSettings,
        messages,
        dispatchMessages,
      }}
    >
      {children}
    </TwitchContext.Provider>
  );
};

export function useTwitch() {
  return useContext(TwitchContext);
}

function initState() {
  const client: tmi.Client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true },
  });
  return client;
}

function messagesReducer(state: IMessages[], action: MessagesActionType) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return [
        ...state,
        {
          ...action.payload.message,
        },
      ];
    }
  }
}

function initSettingsState(): ISettings {
  return {
    channel: '',
    command: 'play',
    player1: '',
    player2: '',
    connectionStatus: 'Disconnected',
  };
}

// function initStateMessages(): IMessages {
//   return { messages: [] };
// }

const unjoinChannel = async (client: tmi.Client, channel: string) => {
  if (client.readyState() === 'OPEN') {
    await client.part(channel);
    await client.disconnect();
    client.removeAllListeners();
  }
};
