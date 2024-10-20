/* eslint-disable react/prop-types */
function Button({ children, disabled, onclick }) {
  return (
    <button
      onClick={onclick}
      type="submit"
      disabled={disabled}
      className="mt-8 rounded-md border-0 bg-green-500 px-3 py-1 uppercase text-neutral-100 transition-all duration-700 hover:bg-green-300 hover:text-neutral-800 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default Button;
