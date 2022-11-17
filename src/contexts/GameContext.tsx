/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { calculateHints, MATCH } from '../logic/game';
import { getRandomListOf } from '../logic/utils';
import {
  MAX_ALLOWED_GUESSES,
  GUESS_SIZE,
  ColorID,
  COLORS,
  Guess,
} from '../logic/constants';

interface IGame {
  answer: ColorID[];
  currentColumnIndex: number;
  rows: ReturnType<typeof initializeRows>;
  finished: boolean;
  currentPlayer: 1 | 2;
  player1: 1;
  player2: 2;
  currentTotalHints: {
    OK: number;
    WRONG: number;
    MISPLACED: number;
  };
}

type ActionType =
  | { type: 'NEW_GAME' }
  | { type: 'CHECK_CURRENT_ROW' }
  | {
      type: 'UPDATE_ROW_GUESS';
      payload: {
        guessIndex: number;
        guess: Guess;
      };
    };

const GameContext = createContext<{
  game: IGame;
  dispatch: React.Dispatch<ActionType>;
}>({
  game: {} as IGame,
  dispatch: () => null,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [game, dispatch] = useImmerReducer(gameReducer, initState());

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  return useContext(GameContext);
}

function gameReducer(draft: IGame, action: ActionType) {
  const activeGame = draft;
  switch (action.type) {
    case 'NEW_GAME': {
      return initState();
    }

    case 'UPDATE_ROW_GUESS': {
      const { guessIndex, guess } = action.payload;

      activeGame.rows[activeGame.currentColumnIndex].guesses[guessIndex] =
        guess;
      return activeGame;
    }

    case 'CHECK_CURRENT_ROW': {
      const hints = calculateHints(
        draft.rows[draft.currentColumnIndex].guesses as ColorID[],
        draft.answer
      );

      // sort the array so user doesn't know the
      // correct guess
      const order = ['O', 'M', 'W'];
      hints.sort((a, b) => order.indexOf(a) - order.indexOf(b));

      activeGame.rows[draft.currentColumnIndex].hints = hints;

      // count the hints in the current column so that
      // it will be used on HintModal component
      activeGame.currentTotalHints.OK = hints.filter((i) => i === 'O').length;
      activeGame.currentTotalHints.MISPLACED = hints.filter(
        (i) => i === 'M'
      ).length;
      activeGame.currentTotalHints.WRONG = hints.filter(
        (i) => i === 'W'
      ).length;
      activeGame.currentColumnIndex++;

      const isWin = hints.every((h) => h === MATCH.OK);

      const isGameOver =
        activeGame.currentColumnIndex > MAX_ALLOWED_GUESSES - 1;
      if (isGameOver || isWin) {
        activeGame.finished = true;
      } else {
        // change the next player
        activeGame.currentPlayer =
          activeGame.currentPlayer === activeGame.player1
            ? activeGame.player2
            : activeGame.player1;
      }

      return draft;
    }
  }
}

function initState(): IGame {
  return {
    currentColumnIndex: 0,
    player1: 1,
    player2: 2,
    currentPlayer: 1,
    rows: initializeRows(MAX_ALLOWED_GUESSES, GUESS_SIZE),
    answer: getRandomListOf<ColorID>(
      GUESS_SIZE,
      Object.keys(COLORS) as ColorID[]
    ),
    finished: false,
    currentTotalHints: {
      OK: 0,
      WRONG: 0,
      MISPLACED: 0,
    },
  };
}

function initializeRows(rowsCount: number, guessSize: number) {
  return Array.from({ length: rowsCount }, () => ({
    guesses: Array.from({ length: guessSize }, () => null as Guess),
    hints: Array.from<MATCH>({ length: guessSize }),
  }));
}
