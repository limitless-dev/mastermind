/* eslint-disable react/function-component-definition */
/* eslint-disable no-nested-ternary */
import { useGame } from '../contexts/GameContext';

import { type ColorID, MAX_ALLOWED_GUESSES } from '../logic/constants';
import { MATCH } from '../logic/game';
import Guesses from './Guesses';
import Hints from './Hints';

const enum GameStatus {
  PLAYING = 'playing',
  LOOSE = 'loose',
  WIN = 'win',
}

const Board: React.VFC = () => {
  const { game, dispatch } = useGame();

  const handleGuessClick = (index: number, colorId: ColorID) => {
    dispatch({
      type: 'UPDATE_ROW_GUESS',
      payload: { guessIndex: index, guess: colorId },
    });
  };

  const handleCheckClick = () => {
    dispatch({ type: 'CHECK_CURRENT_ROW' });
  };

  const isWin = game.rows[game.currentColumnIndex - 1]?.hints.every(
    (h) => h === MATCH.OK
  );
  const isGameOver = game.currentColumnIndex > MAX_ALLOWED_GUESSES - 1;

  const gameStatus = isWin
    ? GameStatus.WIN
    : isGameOver
    ? GameStatus.LOOSE
    : GameStatus.PLAYING;

  return (
    <div className="grid auto-cols-max grid-flow-col gap-10">
      {/* {gameStatus !== GameStatus.PLAYING ? (
        <GameFinishStatus isWin={gameStatus === GameStatus.WIN} />
      ) : null} */}

      {game.rows.map((row, index) => {
        const isActive =
          gameStatus === GameStatus.PLAYING &&
          game.currentColumnIndex === index;

        const canCheck =
          row.guesses.every(Boolean) && !row.hints.every(Boolean);

        return (
          <div
            key={index}
            className="grid grid-cols-1 content-end items-center justify-start gap-10"
          >
            <div className=" grid justify-center">
              <Hints
                hints={row.hints}
                canCheck={canCheck}
                showCheck={isActive}
                onCheckClick={handleCheckClick}
              />
            </div>
            <div className="bg-guess-column-Img grid h-[400px] w-[110px] content-center justify-center bg-[length:100%_100%] bg-no-repeat">
              <Guesses
                isActive={isActive}
                guesses={row.guesses}
                onGuessClick={handleGuessClick}
              />
            </div>
          </div>
        );
      })}
      <GameFinishStatus isWin={gameStatus === GameStatus.WIN} />
    </div>
  );
};

const GameFinishStatus: React.FC<{ isWin: boolean }> = () => {
  const { game } = useGame();
  return (
    <div className="grid grid-cols-1 content-center items-center justify-center gap-10">
      <div
        className={`grid h-[400px] w-[100px] content-center justify-center ${
          game.finished
            ? 'bg-guess-column-Img bg-contain bg-no-repeat'
            : 'bg-result-cover-Img bg-cover bg-no-repeat'
        }`}
      >
        {game.finished && (
          <Guesses
            isActive={false}
            guesses={game.answer}
            onGuessClick={() => console.log('done')}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
