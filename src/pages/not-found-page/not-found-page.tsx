import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page" style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>404 Not Found</h1>
      <Link to={AppRoute.Main}>На главную</Link>
    </div>
  );
}

export default NotFoundPage;


