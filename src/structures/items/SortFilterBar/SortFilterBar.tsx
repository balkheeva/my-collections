import { useState } from 'react';
import { Button, Dropdown, Form, Stack } from 'react-bootstrap';
import {FormattedMessage, useIntl} from 'react-intl';

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
  { value: 'asc', label: 'app.items.dropdown1.item1' },
  { value: 'desc', label: 'app.items.dropdown1.item2' },
] as const;

export default function SortFilterBar(props: Props) {
  const { items, onSortBy, collection, onFilter, sortBy } = props;
  const [showFilter, setShowFilter] = useState(false)
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

  const handleSubmitFilters = (data: any) => {
    onFilter(filters)
    setShowFilter(false)
  }

  return (
    <Stack direction="horizontal" gap={3} className="align-items-start mb-3">
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" >
          <FormattedMessage id={sortType} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {sortItems.map((item) => (
            <Dropdown.Item
              as="button"
              key={item.value}
              onClick={() => onSortBy(item.value)}
            >
              <FormattedMessage id={item.label} />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {fieldsForFilter.length > 0 ? <Dropdown show={showFilter}>
        <Dropdown.Toggle variant="outline-primary" onClick={() => setShowFilter(!showFilter)}>
          <FormattedMessage id="app.items.dropdown2"/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {fieldsForFilter.map((field: any) => ( filters[field.id] !== "undefined" && (
            <Dropdown.Item
              as={FilterItem}
              key={field.id}
              field={field}
              values={filters[field.id] || []}
              opFieldsItems={opFieldsItems}
              onChange={(data) => handleChange(field.id, data)}
            ></Dropdown.Item>
            ))
          )}
          <Button className="m-3" onClick={handleSubmitFilters}>
            <FormattedMessage id="app.collection.page.dropdown.btn"/>
          </Button>
        </Dropdown.Menu>
      </Dropdown> : <div></div>}
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
  const intl = useIntl()

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
          (f: any, index: number) => {
            let value = f[field.id]
            if(field.type === "Boolean" && value != null) {
              value = value ? intl.formatMessage({ id: 'yes' }) : intl.formatMessage({ id: 'no' });
            }
            return f[field.id] != null && (
              <Form.Check
                key={index}
                label={value}
                checked={values.includes(f[field.id])}
                onChange={(e) => handleChange(e.target.checked, f[field.id])}
              />
            )
          }
        )}
      </Form>
    </div>
  );
}
