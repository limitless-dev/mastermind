/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import { useState } from 'react';

import { useGame } from '../contexts/GameContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTwitch } from '../contexts/TwitchContext';
import IconButton from './IconButton';
import GameRules from './GameRules';
import TwitchSettings from './TwitchSettings';
import MenuButton from './layouts/MenuButton';
import TwitchIcon from './Icons/TwitchIcon';
import ReplayIcon from './Icons/ReplayIcon';
import LightIcon from './Icons/LightIcon';
import DarkIcon from './Icons/DarkIcon';
import HelpIcon from './Icons/HelpIcon';
import Modal from './layouts/Modal';

const Header: React.FC = () => {
  const { dispatch, game } = useGame();
  const { theme, toggleTheme } = useTheme();

  const { twitch, dispatchTwitch } = useTwitch();

  /* 
  Game Rules Modal
  */
  const [openRulesModal, setOpenRulesModal] = useState<boolean>(false);
  const [openTwitchModal, setOpenTwitchModal] = useState<boolean>(false);

  return (
    <>
      <header className="flex h-[60px] flex-wrap items-center justify-end gap-2 border-transparent  bg-transparent pr-4">
        <h1 className="text-xl font-bold text-white">{game.answer}</h1>
        <div className="flex gap-3">
          <MenuButton
            tooltipText="Twitch Settings"
            type="button"
            onClick={() => setOpenTwitchModal(true)}
          >
            <TwitchIcon />
          </MenuButton>

          <MenuButton
            tooltipText="New Game"
            type="button"
            onClick={() => dispatch({ type: 'NEW_GAME' })}
          >
            <ReplayIcon />
          </MenuButton>

          <MenuButton tooltipText="Toggle Theme" onClick={toggleTheme}>
            {theme === 'dark' ? <DarkIcon /> : <LightIcon />}
          </MenuButton>

          <MenuButton
            tooltipText="Game Rules"
            onClick={() => setOpenRulesModal(true)}
          >
            <HelpIcon />
          </MenuButton>
        </div>
      </header>

      <Modal
        title=""
        openModal={openRulesModal}
        setOpenModal={setOpenRulesModal}
      >
        <GameRules />
      </Modal>

      <TwitchSettings open={openTwitchModal} setOpen={setOpenTwitchModal} />
    </>
  );
};

export default Header;
