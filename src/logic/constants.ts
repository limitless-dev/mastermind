import RedImg from '../assets/colors/red.svg';
import BlueImg from '../assets/colors/blue.svg';
import GreenImg from '../assets/colors/green.svg';
import YellowImg from '../assets/colors/yellow.svg';
import PinkImg from '../assets/colors/pink.svg';
import WhiteImg from '../assets/colors/white.svg';

export const MAX_ALLOWED_GUESSES = 8;
export const GUESS_SIZE = 4;

export const COLORS = {
  '1': RedImg,
  '2': BlueImg,
  '3': GreenImg,
  '4': YellowImg,
  '5': PinkImg,
  '6': WhiteImg,
};

export type ColorID = keyof typeof COLORS;
export type Guess = ColorID | null;
