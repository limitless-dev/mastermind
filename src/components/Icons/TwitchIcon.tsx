import { SVGProps } from 'react';

export function TwitchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={28}
      fill="currentColor"
      viewBox="0 0 16 15"
      stroke="none"
    >
      <g>
        <g>
          <path
            fill="rgb(0, 0, 0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M 3.857 0 L 1 2.857 L 1 13.143 L 4.429 13.143 L 4.429 16 L 7.286 13.143 L 9.57 13.143 L 14.714 8 L 14.714 0 L 3.857 0 Z M 13.571 7.429 L 11.286 9.714 L 9 9.714 L 7 11.714 L 7 9.714 L 4.429 9.714 L 4.429 1.143 L 13.571 1.143 L 13.571 7.429 Z"
          />
          <path
            stroke="rgb(0, 0, 0)"
            fill="rgb(255, 255, 255)"
            strokeWidth="0.1px"
            d="M 13.584 1.13 L 4.413 1.143 L 4.427 9.714 L 6.986 9.723 L 6.993 11.712 L 9.004 9.711 L 11.305 9.705 L 13.573 7.427 L 13.6 1.631 L 13.603 1.127"
          />
          <path
            d="M 11.886 3.1 L 10.743 3.1 L 10.743 6.527 L 11.886 6.527 L 11.886 3.1 Z M 8.743 3.1 L 7.6 3.1 L 7.6 6.527 L 8.743 6.527 L 8.743 3.1 Z"
            fill="rgb(0, 0, 0)"
          />
        </g>
      </g>
      <path
        d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"
        fill="rgb(0, 0, 0)"
        strokeWidth="0.1px"
      />
    </svg>
  );
}
export default TwitchIcon;
