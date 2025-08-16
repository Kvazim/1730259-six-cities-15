import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="loader-wrapper-bg">
      <div className="loader-wrapper">
        <div className="loader">
          <div className="loader loader-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
