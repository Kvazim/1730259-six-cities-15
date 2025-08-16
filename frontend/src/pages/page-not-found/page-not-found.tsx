import { Helmet } from 'react-helmet-async';
import './style.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <div className="body">
      <Helmet>
        <title>six cities simple: Page not found</title>
      </Helmet>
      <div className="page-not-found">
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We&nbsp;can&rsquo;t find the page you&rsquo;re looking for.</p>
        <Link to={AppRoute.Root}>Go back home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
