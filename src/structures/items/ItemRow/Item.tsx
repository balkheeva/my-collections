import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { TCollection } from '../../../api/collections';
import { TItem } from '../../../api/items';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import { formatDate } from '../../../infrastructure/helpers/formatDate';
import TagCloud from '../../tags/TagBadges';
import ModalItem from '../ModalItem/ModalItem';

type Props = {
  item: TItem;
  collection: TCollection;
  onDelete?: (form: any) => void;
  onSubmit?: (form: any) => void;
  isAuthor: boolean;
  optionalFields?: Array<{ type: string; id: string; name: string }>;
};

export default function Item(props: Props) {
  const { item, onDelete, optionalFields, collection, onSubmit, isAuthor } =
    props;
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const handleSubmit = (form: any) => {
    onSubmit?.(form);
    setShow(false);
  };
  return (
    <>
      <tr>
        <td>{item.id.slice(0, 6)}</td>
        <td>
          <NavLink to={`/item/${item.id}`}>{item.name}</NavLink>
        </td>
        <td>
          <TagCloud tags={item.tags} />
        </td>
        {optionalFields?.map((field: any) => {
          let value = item.optionalFields[field.id];
          if (field.type === 'Boolean' && value != null) {
            value = value
              ? intl.formatMessage({ id: 'yes' })
              : intl.formatMessage({ id: 'no' });
          }
          return (
            <td
              className="overflow-hidden"
              style={{ textOverflow: 'ellipsis' }}
              key={field.id}
            >
              {value || '—'}
            </td>
          );
        })}
        <td>{formatDate(item.createdAt)}</td>
        {isAuthor && (
          <td>
            <Button
              variant="link"
              className="p-0 me-2"
              onClick={() => onDelete?.(item)}
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="link"
              className="p-0"
              onClick={() => {
                setShow(true);
              }}
            >
              <EditIcon />
            </Button>
          </td>
        )}
      </tr>
      <ModalItem
        initialValues={item}
        collection={collection}
        onFormSubmit={handleSubmit}
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
}
