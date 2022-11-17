import { useState } from 'react';
import { Guess, ColorID, COLORS } from '../logic/constants';
import ColorPicker from './ColorPicker';

const Guesses: React.FC<{
  guesses: Guess[];
  isActive: boolean;
  onGuessClick: (index: number, colorId: ColorID) => void;
}> = ({ guesses, isActive, onGuessClick }) => {
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState(-1);

  function handleOpenColorPicker(index: number) {
    if (openColorPickerIndex === index) {
      setOpenColorPickerIndex(-1);
    } else {
      setOpenColorPickerIndex(index);
    }
  }

  return (
    <div className="grid items-center justify-between gap-8">
      {guesses.map((guess, index) => (
        <div key={index} className="relative">
          <div className="bg-coin-border-Img bg-contain bg-no-repeat">
            <button
              className={`h-[60px] w-[60px] bg-contain bg-no-repeat ${
                !guess && isActive ? '' : ''
              }`}
              style={{ backgroundImage: guess ? `url(${COLORS[guess]})` : '' }}
              onClick={() => handleOpenColorPicker(index)}
              disabled={!isActive}
              type="button"
              aria-label="Pick Color"
            />
          </div>
          {isActive && openColorPickerIndex === index && (
            <ColorPicker
              onClick={(color) => {
                onGuessClick(index, color);
                setOpenColorPickerIndex(-1);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Guesses;
