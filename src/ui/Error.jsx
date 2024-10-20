import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😔😔</h1>
      <p>{error.data || error.message}</p>
      <button
        type="submit"
        onClick={() => navigate(-1)}
        className="font-semibold tracking-tighter text-blue-600 transition-all hover:text-blue-800"
      >
        &larr; Back
      </button>
    </div>
  );
}

export default Error;
