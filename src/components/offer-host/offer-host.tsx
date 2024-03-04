import cn from 'classnames';
import { Host } from '../../types/offers';

type OfferHostProps = {
  host: Host;
  description: string | string[];
}

function OfferHost({host, description}: OfferHostProps): JSX.Element {
  const {isPro, avatarUrl, name} = host;

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div
          className={
            cn(
              'offer__avatar-wrapper user__avatar-wrapper',
              {'offer__avatar-wrapper--pro': isPro}
            )
          }
        >
          <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {
          isPro &&
          <span className="offer__user-status">
            Pro
          </span>
        }
      </div>
      <div className="offer__description">
        {
          Array.isArray(description)
            ?
            description.map((item) => <p key={item} className="offer__text">{item}</p>)
            :
            <p className="offer__text">{description}</p>
        }

      </div>
    </div>
  );
}

export default OfferHost;
