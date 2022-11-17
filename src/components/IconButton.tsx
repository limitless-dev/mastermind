const IconButton: React.FC<{
  title?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ title, onClick, children }) => {
  return (
    <button
      className="text-2xl hover:opacity-70"
      title={title}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default IconButton;
