import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { GUESS_SIZE, MAX_ALLOWED_GUESSES } from '../logic/constants';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const GameRules: React.FC = () => {
  const [categories] = useState({
    Objective: [
      {
        id: 1,
        title: `A secret combination of ${GUESS_SIZE} colors is selected and you have to guess that combination in ${MAX_ALLOWED_GUESSES} or fewer tries to win`,
      },
    ],
    Rules: [
      {
        id: 1,
        title: `
        From top to bottom, at each row, click on a circle and pick a color.
        After filling all circles in a row, you can check your guess.`,
      },
      {
        id: 2,
        title: 'A green circle means the color and the position is correct.',
      },
      {
        id: 3,
        title: `An orange circle means that the color exists in the combination but the position is not correct.`,
      },
      {
        id: 4,
        title: `An empty circle means that color is not in the combination at all`,
      },
    ],
    Twitch: [
      {
        id: 1,
        title:
          'You have to use the command !play followed by 4 colors separated by space',
      },
      {
        id: 2,
        title: 'Colors are: red, yellow, blue, white, green, pink',
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="">
      <div className="w-full max-w-md px-2 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 dark:bg-gray-900">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-white',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white  dark:bg-gray-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white dark:bg-gray-900 p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default GameRules;
