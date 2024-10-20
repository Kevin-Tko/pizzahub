import { RotatingLines } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <div className="absolute bg-neutral-200/20 inset-0 backdrop-blur-sm flex items-center justify-center">
      <div>
        <RotatingLines
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          width="32"
          visible={true}
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
