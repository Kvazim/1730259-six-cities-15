import { Cities } from '../../const';
import { capitalize } from '../../utils/utils';

type MainEmptyProps = {
  currentCity: Cities;
}

function MainEmpty({currentCity}: MainEmptyProps): JSX.Element {
  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {capitalize(currentCity)}</p>
    </div>
  );
}

export default MainEmpty;
