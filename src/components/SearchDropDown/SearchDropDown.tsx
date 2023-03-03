import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function SearchDropDown({ foundData, onClick }: any) {
  return (
    <ListGroup
      className="position-absolute shadow-sm w-100"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {foundData?.map((item: any) => (
        <FoundItem key={item.id} item={item} />
      ))}
    </ListGroup>
  );
}

export function FoundItem(props: { item: any }) {
  const { item } = props;
  const fields = Object.keys(item.highlight);

  const prettyFields = {
    'tags.name': 'tags',
    name: 'name',
    'collection.author.name': 'author',
    'comments.comment': 'comments',
    'comments.author.name': 'comments',
    'collection.themes.name': 'themes',
    optionalFields: 'others',
  };
  return (
    <ListGroup.Item as={NavLink} to={`/item/${item.id}`}>
      {item.data.name}
      <br />
      {fields.map((f, index) => (
        <InnerHTML
          key={index}
          field={f}
          children={item}
          prettyFields={prettyFields}
        />
      ))}
    </ListGroup.Item>
  );
}

export function InnerHTML(props: {
  children: any;
  field: string;
  prettyFields: any;
}) {
  const { children, field, prettyFields } = props;
  return (
    <small>
      {prettyFields[field]}:{' '}
      <span
        dangerouslySetInnerHTML={{ __html: children?.highlight?.[field]?.[0] }}
      />{' '}
    </small>
  );
}
