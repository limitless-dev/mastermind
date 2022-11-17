import { MATCH } from '../logic/game';

const Hints: React.VFC<{
  hints: MATCH[];
  canCheck: boolean;
  showCheck: boolean;
  onCheckClick: () => void;
}> = ({ hints, showCheck, canCheck, onCheckClick }) => {
  return (
    <div
      className={`${
        showCheck
          ? ''
          : 'hints grid grid-cols-2 items-center justify-between gap-1'
      } `}
    >
      {showCheck ? (
        <button
          disabled={!canCheck}
          className={[
            'retroTextEN text-[24px] p-1 border rounded-full text-white dark:text-white w-full',
            'disabled:opacity-50 dark:disabled:opacity-40 disabled:cursor-not-allowed',
          ].join(' ')}
          onClick={onCheckClick}
          type="button"
        >
          Check
        </button>
      ) : (
        hints.map((hint, index) => <Hint key={index} hint={hint} />)
      )}
    </div>
  );
};

const Hint: React.FC<{ hint: MATCH }> = ({ hint }) => {
  return (
    <div className="bg-coin-border-Img h-9 w-9 bg-contain bg-no-repeat">
      <div
        className={`  h-9 w-9 ${
          hint === MATCH.OK
            ? 'popout bg-hintOK-Img bg-contain bg-no-repeat'
            : hint === MATCH.MISPLACED
            ? 'popout bg-hintMisplaced-Img bg-contain bg-no-repeat'
            : ''
        }`}
      />
    </div>
  );
};

export default Hints;
