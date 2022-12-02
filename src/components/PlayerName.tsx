/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { useGame } from '../contexts/GameContext';
import { useTwitch } from '../contexts/TwitchContext';

export const PlayerName: React.FC<{
  title?: string;
  onClick?: () => void;
}> = ({ title, onClick }) => {
  const { game } = useGame();
  const { settings } = useTwitch();
  const [milliseconds, setMilliseconds] = useState(0);
  const interval = useInterval(() => setMilliseconds((ms) => ms + 10), 10);

  useEffect(() => {
    if (game.currentColumnIndex === 0) {
      interval.stop();
      setMilliseconds(0);
    } else if (game.finished) {
      interval.stop();
    } else {
      setMilliseconds(0);
      interval.start();
    }
  }, [game.currentColumnIndex]);

  return (
    <div className="retroTextEN fixed top-[50%] left-[0] w-[300px] translate-y-[-30%] translate-x-[-140%] text-[50px] text-white">
      <div className="text-left">
        {game.currentPlayer === 1
          ? settings.player1 !== ''
            ? settings.player1
            : 'Player 1'
          : settings.player2 !== ''
          ? settings.player2
          : 'Player 2'}
      </div>
      <div className="translate-y-[-30%] text-left ">
        <span>{`0${Math.floor((milliseconds / 60000) % 60)}`.slice(-2)}</span>:
        <span>{`0${Math.floor(milliseconds / 1000) % 60}`.slice(-2)}</span>:
        <span>{`0${Math.floor((milliseconds / 10) % 1000)}`.slice(-2)}</span>
      </div>
    </div>
  );
};
