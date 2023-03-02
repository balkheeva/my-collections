import { Table } from 'react-bootstrap';

import { TCollection } from '../../../api/collections';
import { TItem } from '../../../api/items';
import Item from '../ItemRow/Item';

type Props = {
  items: TItem[] | undefined;
  isAuthor: boolean;
  collection: TCollection;
  onDelete?: (form: any) => void;
  onSubmit?: (form: any) => void;
  optionalFields: Array<{ type: string; id: string; name: string }>;
};
export default function ItemsTable(props: Props) {
  const { items, onDelete, optionalFields, collection, onSubmit, isAuthor } =
    props;
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Tags</th>
          {optionalFields.map((field, index) => (
            <th key={index} className="text-nowrap">
              {field.name}
            </th>
          ))}
          <th>Created</th>
          {isAuthor && <th></th>}
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete as (form: any) => void}
            optionalFields={optionalFields}
            collection={collection}
            onSubmit={onSubmit as (form: any) => void}
            isAuthor={isAuthor}
          />
        ))}
      </tbody>
    </Table>
  );
}
