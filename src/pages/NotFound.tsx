import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1 className="text-gray-800">Not Found</h1>
      <Link to="/">GO HOME</Link>
    </>
  );
}

export default NotFound;
