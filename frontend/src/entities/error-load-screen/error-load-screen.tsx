import { useAppDispatch } from '../../hooks';
import { AppThunk } from '../../shared/types/state';
import './style.css';


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
