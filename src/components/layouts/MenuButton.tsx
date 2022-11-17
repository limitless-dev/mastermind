import React from 'react';
import { Tooltip } from '@mantine/core';

type Properties = {
  border?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  tooltipText?: string;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  id?: string;
};
const MenuButton: React.FC<Properties> = ({
  backgroundColor,
  border,
  height,
  id,
  children,
  onClick,
  radius,
  title,
  tooltipText,
  type,
  width,
}) => {
  return (
    <Tooltip label={tooltipText}>
      <button
        id={id}
        // eslint-disable-next-line react/button-has-type
        type={type}
        onClick={onClick}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-solid bg-white p-[5px] text-base font-medium text-[#495057]  hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-transparent dark:text-white dark:hover:bg-gray-800 dark:focus:ring-white"
        style={{
          backgroundColor,
          border,
          borderRadius: radius,
          height,
          width,
        }}
        title={title}
      >
        {children}
      </button>
    </Tooltip>
  );
};
export default MenuButton;
