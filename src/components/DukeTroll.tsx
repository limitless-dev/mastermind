import video from '../assets/video/duke_dancing.webm';

const DukeTroll: React.FC = () => {
  const DukeImgs: string[] = [
    'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_3b559af21ad7479b81814199c90032eb/default/dark/3.0',
    'https://static-cdn.jtvnw.net/emoticons/v2/307704727/default/dark/3.0',
    'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_1ec3ca71fe18462494b68e6ef73d4cfd/default/dark/3.0',
    'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_2095c5b6d40d4b5f878b934e7993b8c7/default/dark/3.0',
  ];

  // const random = Math.floor(Math.random() * 2) + 1;
  return (
    <>
      {/* {random === 1 ? (
        <div className="grid items-center  justify-between gap-8 overflow-hidden">
          {DukeImgs.map((guess, index) => (
            <div key={index} className="relative">
              <div className=" bg-contain bg-no-repeat">
                <button
                  className="h-[60px] w-[60px]  translate-x-[5px] rounded-full border border-none bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: guess ? `url(${DukeImgs[index]})` : '',
                  }}
                  disabled={false}
                  type="button"
                  aria-label="Pick Color"
                />
              </div>
            </div>
          ))}
        </div>
      ) : ( */}
      <div className="bg-dukeTroll-Img grid h-[300px] w-[80px] items-center justify-between gap-8 overflow-hidden bg-cover bg-center bg-no-repeat " />
      {/* )} */}

      {/* <div className="grid items-center  justify-between gap-8 overflow-hidden">
        {DukeImgs.map((guess, index) => (
          <div key={index} className="relative">
            <div className=" bg-contain bg-no-repeat">
              <div
                className="h-[60px] w-[60px]  translate-x-[5px] rounded-full border border-none bg-contain bg-no-repeat"
                style={{}}
              >
                {' ddd'}
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default DukeTroll;
