import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center">
        <FormattedMessage id="app.notfound.page.title" />
      </h1>
      <Button
        className="d-block mx-auto"
        variant="link"
        onClick={() => navigate('/')}
      >
        <FormattedMessage id="app.notfound.page.btn" />
      </Button>
    </div>
  );
}
