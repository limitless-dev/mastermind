/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Modal from './layouts/Modal';
import { useTwitch } from '../contexts/TwitchContext';
import { useGame } from '../contexts/GameContext';

import { type ColorID } from '../logic/constants';

const TwitchSettings: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const {
    settings,
    dispatchSettings,
    twitch,
    dispatchTwitch,
    dispatchMessages,
  } = useTwitch();

  const { game, dispatch: dispatchGame } = useGame();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const validateUserEntries = useCallback(
    (userArr: string[]) => {
      //  mapping for colors and their key numbers
      const map: { [key in ColorID]: string[] } = {
        '1': ['red', 'احمر', 'أحمر', 'حمر'],
        '2': ['blue', 'ازرق', 'أزرق', 'زرق'],
        '3': ['green', 'اخضر', 'أخضر', 'خضر'],
        '4': ['yellow', 'اصفر', 'أصفر', 'صفر', 'برتقالي'],
        '5': [
          'pink',
          'وردي',
          'زهري',
          'ردي',
          'هري',
          'بنفسجي',
          'بينكي',
          'بنكي',
          'بينك',
        ],
        '6': ['white', 'ابيض', 'أبيض', 'بيض'],
      };

      const matchArr: string[] = [
        ...map['1'],
        ...map['2'],
        ...map['3'],
        ...map['4'],
        ...map['5'],
        ...map['6'],
      ];

      const validEntry: boolean = userArr.every((userValue) =>
        matchArr.some((matchValue) => {
          return new RegExp(`^${matchValue}$`, '').test(
            userValue.toLowerCase()
          );
          // return new RegExp(`\\b${matchValue.toLowerCase()}\\b`).test(
          //   userValue.toLowerCase()
          // );
        })
      );

      console.log('validEntry:', validEntry);

      const newAnswer: ColorID[] = [];

      if (validEntry) {
        // function to convert colors into string
        // numbers of colorID
        userArr.forEach((answerValue) => {
          (Object.keys(map) as Array<keyof typeof map>).forEach((value) => {
            if (map[value].includes(answerValue.toLocaleLowerCase())) {
              // to 'map' which is an object with 6
              // kays mapped to each color
              newAnswer.push(value);
            }
          });
        });
        newAnswer.forEach((color, index) => {
          dispatchGame({
            type: 'UPDATE_ROW_GUESS',
            payload: { guessIndex: index, guess: color },
          });
        });

        dispatchGame({ type: 'CHECK_CURRENT_ROW' });
        console.log('the answer is:', newAnswer);
      }
    },
    [dispatchGame]
  );

  const twitchListeners = useCallback(() => {
    twitch.on('message', (channel, userstate, message, self) => {
      if (self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const receivedCommand = args.shift()?.toLowerCase();

      const twitchUsername = userstate.username?.toLowerCase();
      const firstPlayer = settings.player1?.toLocaleLowerCase();
      const secondPlayer = settings.player2?.toLocaleLowerCase();

      if (receivedCommand !== settings.command) return;
      if (twitchUsername !== firstPlayer && twitchUsername !== secondPlayer)
        return;

      if (game.currentPlayer === 1 && firstPlayer !== twitchUsername) return;
      if (game.currentPlayer === 2 && secondPlayer !== twitchUsername) return;

      // take the message in a form of array, ignore
      // the first element which will be the command
      // and pass the message only if it contains 4 colors
      const playMessage = message.split(' ').slice(1, 5);
      if (playMessage.length !== 4) return;
      validateUserEntries(playMessage);

      dispatchMessages({
        type: 'ADD_MESSAGE',
        // eslint-disable-next-line object-shorthand
        payload: { message: { ...userstate, ...{ message: message } } },
      });
    });

    twitch.on('disconnected', (reason) => {
      dispatchSettings({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          connectionStatus: `Disconnected reason: ${reason}`,
        },
      });
    });
  }, [
    dispatchMessages,
    dispatchSettings,
    game.currentPlayer,
    settings.command,
    settings.player1,
    settings.player2,
    twitch,
    validateUserEntries,
  ]);

  useEffect(() => {
    twitch.removeAllListeners('message');
    twitch.removeAllListeners('disconnected');
    twitchListeners();
  }, [
    settings.command,
    settings.player1,
    settings.player2,
    twitch,
    twitchListeners,
  ]);

  return (
    <Modal
      title="Twitch Settings"
      openModal={open}
      setOpenModal={setOpen}
      statusText={
        <TwitchConnectionStatus connectionStatus={settings.connectionStatus} />
      }
      actionButton={
        !['CLOSING', 'CONNECTING'].some(
          (connection) =>
            twitch.readyState().toLocaleLowerCase().includes(connection) ||
            !['joined', 'disconnected'].some((status) =>
              settings.connectionStatus.toLocaleLowerCase().includes(status)
            )
        ) ? (
          <TwitchConnectButton
            buttonRef={buttonRef}
            connectionStatus={settings.connectionStatus}
            onClick={async () => {
              buttonRef.current?.setAttribute('disabled', 'true');
              if (
                twitch.readyState().includes('CLOSED') ||
                twitch.getChannels().length === 0
              ) {
                dispatchTwitch({
                  type: 'CONNECT',
                  payload: { channel: settings.channel },
                });
                twitch.removeAllListeners();
                await twitchListeners();
              } else {
                dispatchTwitch({
                  type: 'DISCONNECT',
                });
              }
              setTimeout(() => {
                buttonRef.current?.removeAttribute('disabled');
              }, 3000);
            }}
          />
        ) : null
      }
    >
      <div className="grid grid-cols-6 gap-6 gap-y-10">
        <div className="col-span-4 col-start-1 sm:col-span-4 sm:col-start-1">
          <label
            htmlFor="twitch-channel"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Channel
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 sm:text-sm">
              @
            </span>
            <input
              type="text"
              name="twitch-channel"
              id="twitch-channel"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder=""
              // disabled={true}
              value={settings.channel}
              disabled={settings.connectionStatus.includes('Joined')}
              onChange={(e) =>
                dispatchSettings({
                  type: 'UPDATE_CHANNEL',
                  payload: {
                    channel: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="col-span-2 col-start-5 sm:col-span-2 sm:col-start-5">
          <label
            htmlFor="twitch-command"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Command
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 sm:text-sm">
              !
            </span>
            <input
              type="text"
              name="twitch-command"
              id="twitch-command"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder=""
              value={settings.command}
              onChange={(e) => {
                dispatchSettings({
                  type: 'UPDATE_COMMAND',
                  payload: {
                    command: e.target.value,
                  },
                });

                // setTimeout(() => {
                // await twitchListeners();
                // }, 10000);
              }}
            />
          </div>
        </div>
        <div className=" col-span-3 sm:col-span-3">
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Player 1
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 sm:text-sm">
              @
            </span>
            <input
              type="text"
              name="twitch-player1"
              id="twitch-player1"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder=""
              value={settings.player1}
              onChange={(e) =>
                dispatchSettings({
                  type: 'UPDATE_PLAYER1',
                  payload: {
                    player1: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="col-span-3 sm:col-span-3">
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Player 2
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 sm:text-sm">
              @
            </span>
            <input
              type="text"
              name="twitch-player2"
              id="twitch-player2"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder=""
              value={settings.player2}
              onChange={(e) =>
                dispatchSettings({
                  type: 'UPDATE_PLAYER2',
                  payload: {
                    player2: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="mb-4" />
      </div>
    </Modal>
  );
};

export default TwitchSettings;

const TwitchConnectionStatus: React.FC<{
  connectionStatus: string;
}> = ({ connectionStatus }) => {
  return (
    <div className="col-span-4 col-start-1 sm:col-span-4 sm:col-start-1">
      <p
        className={`inline-block align-middle text-sm font-semibold ${
          connectionStatus.toLocaleLowerCase().includes('disconnected')
            ? 'text-red-600'
            : 'text-green-700'
        } `}
      >
        {connectionStatus}
      </p>
    </div>
  );
};

const TwitchConnectButton: React.FC<{
  onClick: () => void;
  buttonRef: React.Ref<HTMLButtonElement>;
  connectionStatus: string;
}> = ({ onClick, buttonRef, connectionStatus }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-md border border-transparent  px-3.5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700  ${
        connectionStatus.toLocaleLowerCase().includes('disconnected')
          ? 'bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-900'
          : connectionStatus.toLocaleLowerCase().includes('joined')
          ? 'bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-900'
          : ''
      }`}
      onClick={onClick}
      ref={buttonRef}
    >
      {connectionStatus.toLocaleLowerCase().includes('disconnected')
        ? 'Connect'
        : connectionStatus.toLocaleLowerCase().includes('joined')
        ? 'Disconnect'
        : ''}
    </button>
  );
};
