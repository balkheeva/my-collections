import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { TCollection } from '../api/collections';
import { TItem } from '../api/items';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import SettingsIcon from './icons/SettingsIcon';

type Props = {
  baseItem: TCollection | TItem;
  onDelete: (id: string) => void;
  onEdit?: (from: any) => void;
};
export default function SettingsDropDown(props: Props) {
  const { baseItem, onDelete, onEdit } = props;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <SettingsIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit}>
          <EditIcon />
          <span className="ms-1">
            <FormattedMessage id="app.collection.dropdown.item1" />
          </span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(baseItem.id)}>
          <DeleteIcon />
          <span className="ms-1">
            <FormattedMessage id="app.collection.dropdown.item2" />
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
