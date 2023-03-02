import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center">Sorry, the page is not found</h1>
      <Button
        className="d-block mx-auto"
        variant="link"
        onClick={() => navigate('/')}
      >
        Go to Home page
      </Button>
    </div>
  );
}
