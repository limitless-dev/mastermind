/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';

export const HintsModal: React.FC = () => {
  const { game } = useGame();
  const [show, setShow] = useState(false);
  const [HitText, setHitText] = useState('');
  const [BlowText, setBlowText] = useState('');

  useEffect(() => {
    if (game.currentColumnIndex === 0) return;
    if (game.currentTotalHints.OK > 0) {
      game.currentTotalHints.OK > 1
        ? setHitText(`${game.currentTotalHints.OK} Hits! `)
        : setHitText(`${game.currentTotalHints.OK} Hit! `);
    } else if (game.currentTotalHints.OK === 0) {
      setHitText('');
    }

    if (game.currentTotalHints.MISPLACED > 0) {
      game.currentTotalHints.MISPLACED > 1
        ? setBlowText(`${game.currentTotalHints.MISPLACED} Blows!`)
        : setBlowText(`${game.currentTotalHints.MISPLACED} Blow!`);
    } else if (game.currentTotalHints.MISPLACED === 0) {
      setBlowText('');
    }
    setTimeout(() => setShow(true), 1200);
    setTimeout(() => setShow(false), 3000);
  }, [game.currentColumnIndex]);

  return (
    <>
      {show && (
        <div className="retroHintsModalEN fixed top-2/4 left-2/4 w-full translate-x-[-50%] translate-y-[-50%] text-center text-[80px] text-white">
          {`${HitText + BlowText}`}
        </div>
      )}
    </>
  );
};
