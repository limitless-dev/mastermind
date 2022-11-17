import { useTranslation } from 'react-i18next';
import * as tmi from 'tmi.js';
import { ThemeProvider } from '../contexts/ThemeContext';
import { GameProvider, useGame } from '../contexts/GameContext';
import Header from '../components/Header';
import Board from '../components/Board';
import { PlayerName } from '../components/PlayerName';
import { HintsModal } from '../components/HintsModal';

import './Home.css';

const client = new tmi.Client({
  options: { debug: true },

  channels: ['limitless95x'],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  // "Alca: Hello, World!"
  console.log(`${tags['display-name']}: ${message}`);
});

function Home() {
  const { game } = useGame();
  const { t } = useTranslation(['common']);

  return (
    <ThemeProvider>
      <GameProvider>
        <Header />
        <div className="container relative mb-8">
          <div className="boardArea bg-board-Img grid h-[660px] w-[1400px] translate-y-[-2rem] items-start justify-center bg-[length:100%_100%] bg-no-repeat p-10">
            <Board />
            <HintsModal />
          </div>
          <div className="gameTagArea">
            <div className="bg-channelTag-Img sticky grid h-[117px] w-[500px] items-center justify-center gap-8 bg-contain bg-no-repeat p-0">
              <p className="retroTextEN ChannelTextEffect h-[10px] text-center text-[50px] text-white">
                Duke of Arabia
              </p>
              <p className="retroTextEN GameTextEffect text-center text-[50px] text-[#707070]">
                Mastermind
              </p>
            </div>
          </div>

          <div className="colorsListArea translate-y-[-2.8rem]">
            <div className="bg-possibleColors-Img h-[117px] w-[600px] bg-contain bg-no-repeat" />
            <PlayerName />
          </div>
        </div>
      </GameProvider>
    </ThemeProvider>
  );
}

export default Home;
