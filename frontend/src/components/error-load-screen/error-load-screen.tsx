import { useAppDispatch } from '../../hooks';
import './style.css';
import { AppThunk } from '../../types/state';

type ErrorRewiewsSreenProps = {
  onButtonDispatchClick: () => AppThunk;
}

function ErrorLoadSreen({onButtonDispatchClick}: ErrorRewiewsSreenProps):JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className='error-review'>
      <p>Ошибка загрузки данных</p>
      <button onClick={() => {
        dispatch(onButtonDispatchClick());
      }}
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}

export default ErrorLoadSreen;
