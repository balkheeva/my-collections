import { useState } from 'react';
import { Button, Dropdown, Form, Stack } from 'react-bootstrap';

import { TCollection } from '../../../api/collections';
import { TItem } from '../../../api/items';

type Props = {
  items: TItem[];
  onSortBy: (data: 'asc' | 'desc') => void;
  collection: TCollection;
  onFilter: (filters: Record<string, any[]>) => void;
  sortBy: string;
};

const sortItems = [
  { value: 'asc', label: 'Oldest first' },
  { value: 'desc', label: 'Newest first' },
] as const;

export default function SortFilterBar(props: Props) {
  const { items, onSortBy, collection, onFilter, sortBy } = props;
  const opFieldsItems = items.map((item) => item.optionalFields);
  const fieldsForFilter = collection.optionalFields.filter(
    (field: any) => field.type !== 'Date',
  );
  const [filters, setFilters] = useState<Record<string, any>>({});
  const sortType = sortItems.find((i) => i.value === sortBy)?.label;

  const handleChange = (id: string, data: any) => {
    const newFilters = { ...filters };
    if (data.length) newFilters[id] = data;
    else delete newFilters[id];
    setFilters(newFilters);
  };

  return (
    <Stack direction="horizontal" gap={3} className="align-items-start">
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary">{sortType}</Dropdown.Toggle>
        <Dropdown.Menu>
          {sortItems.map((item) => (
            <Dropdown.Item
              as="button"
              key={item.value}
              onClick={() => onSortBy(item.value)}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="outline-primary">Filter by</Dropdown.Toggle>
        <Dropdown.Menu>
          {fieldsForFilter.map((field: any) => (
            <Dropdown.Item
              as={FilterItem}
              key={field.id}
              field={field}
              values={filters[field.id] || []}
              opFieldsItems={opFieldsItems}
              onChange={(data) => handleChange(field.id, data)}
            ></Dropdown.Item>
          ))}
          <Button className="m-3" onClick={() => onFilter(filters)}>
            Apply
          </Button>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}
export function FilterItem(props: {
  field: any;
  opFieldsItems: any;
  onChange: (data: any[]) => void;
  values: any[];
}) {
  const { opFieldsItems, field, onChange, values } = props;

  const handleChange = (checked: boolean, fieldValue: any) => {
    let data = [...values];
    if (checked) data.push(fieldValue);
    else data = data.filter((f) => f !== fieldValue);
    onChange(data);
  };

  return (
    <div className="ps-3 pe-3 pt-1 pb-1" style={{ whiteSpace: 'nowrap' }}>
      <span>
        <strong>{field.name}</strong>
      </span>
      <Form>
        {opFieldsItems.map(
          (f: any, index: number) =>
            f[field.id] != null && (
              <Form.Check
                key={index}
                label={f[field.id]}
                checked={values.includes(f[field.id])}
                onChange={(e) => handleChange(e.target.checked, f[field.id])}
              />
            ),
        )}
      </Form>
    </div>
  );
}
