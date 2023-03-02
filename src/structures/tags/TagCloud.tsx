import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { TTags } from '../../api/tags';

type Props = {
  tags: TTags[] | undefined;
};

export default function TagCloud(props: Props) {
  const { tags } = props;
  const navigate = useNavigate();
  const handleClickOnTag = (query: string) => {
    navigate(`/search/?query=${query}`);
  };
  return (
    <div style={{ maxWidth: '350px' }}>
      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-center flex-wrap"
      >
        {tags?.map((tag) => (
          <Button
            variant="success"
            className="rounded-5"
            onClick={() => handleClickOnTag(tag.name)}
            key={tag.id}
          >
            {tag.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
}
