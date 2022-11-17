import { ColorID, COLORS } from '../logic/constants';

const colorIDs = Object.keys(COLORS) as ColorID[];

const ColorPicker: React.FC<{ onClick: (color: ColorID) => void }> = ({
  // eslint-disable-next-line react/prop-types
  onClick,
}) => {
  return (
    <div className="absolute top-full left-1/2 z-10 mt-1 flex w-36 -translate-x-1/2 flex-wrap rounded-xl border-2 border-slate-700 bg-slate-800 shadow-lg">
      <div className="absolute -top-3 left-1/2 inline-block w-4 -translate-x-1/2 overflow-hidden">
        <div className="h-3 w-3 origin-bottom-left rotate-45 bg-slate-700" />
      </div>

      {colorIDs.map((colorId) => (
        <div
          key={colorId}
          className="flex w-1/3 items-center justify-center p-2"
        >
          <button
            aria-label="Select Color"
            type="button"
            style={{ backgroundImage: `url(${COLORS[colorId]})` }}
            className="h-8 w-8 bg-contain bg-no-repeat hover:opacity-80"
            onClick={() => onClick(colorId)}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
