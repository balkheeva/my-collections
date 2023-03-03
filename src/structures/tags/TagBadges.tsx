import { Badge } from 'react-bootstrap';

import { TTags } from '../../api/tags';
import {useNavigate} from "react-router-dom";

type Props = {
  tags: TTags[] | undefined;
  bg?: string;
};

export default function TagBadges(props: Props) {
  const { tags, bg } = props;
  const navigate = useNavigate()
  const handleClickOnTag = (query: string) => {
    navigate(`/search/?query=${query}`);
  };
  return (
    <div>
      {tags?.map((tag) => (
        <Badge pill bg={bg || 'success'} key={tag.id} onClick={() => handleClickOnTag(tag.name)} style={{cursor: "pointer"}}>
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
