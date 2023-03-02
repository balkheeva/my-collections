import { useState } from 'react';
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import CrossIcon from '../icons/CrossIcon';

type Function = (data: any) => Promise<{ value: any; label: string }>;

type Props = {
  values: Array<{ value: any; label: string }>;
  onLoadItems: (
    search: string,
  ) => Promise<Array<{ value: any; label: string }>>;
  onChange: (data: any) => void;
  isCreatable?: boolean;
  onCreate?: Function;
  title?: string;
};
type Item = {
  value: any;
  label: any;
};
export default function MultiSelect(props: Props) {
  const { values, onChange, onLoadItems, isCreatable, onCreate, title } = props;
  const [items, setItems] = useState<Array<{ value: any; label: string }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = async (searchValue: string) => {
    setInputValue(searchValue);
    const data = await onLoadItems(searchValue);
    setItems(data);
    setIsOpen(true);
  };

  const handleFocus = () => {
    handleInputChange(inputValue);
  };
  const handleDeleteItem = (value: any) => {
    onChange(values.filter((item) => item.value !== value));
  };

  const handleSelectItem = (value: any) => {
    onChange([...values, value]);
    setIsOpen(false);
    setInputValue('');
  };
  const handleCreate = async () => {
    const data = onCreate && (await onCreate({ label: inputValue }));
    handleSelectItem(data);
  };

  const filtered = items.filter((item) =>
    values?.every((i) => i.value !== item.value),
  );
  return (
    <>
      <Form.Label>{title}</Form.Label>
      <InputGroup>
        <Form.Control
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setIsOpen(false)}
          placeholder="Start typing..."
          value={inputValue}
        />
        {isCreatable && inputValue.length > 0 && items.length < 1 && (
          <Button variant="outline-primary" onClick={handleCreate}>
            Create a new tag
          </Button>
        )}
      </InputGroup>

      <div className="mt-1 mb-1">
        {values?.map((item) => (
          <SelectedItem
            key={item.value}
            baseItem={item}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
      {isOpen && (
        <ListGroup className="shadow-sm w-auto position-absolute">
          {filtered.map((item) => (
            <ListGroupItem
              variant="primary"
              action
              key={item.value}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                handleSelectItem(item);
                e.preventDefault();
              }}
            >
              {item.label}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export function SelectedItem(props: {
  baseItem: Item;
  onDeleteItem: (id: number) => void;
}) {
  const { baseItem, onDeleteItem } = props;
  return (
    <Button
      size="sm"
      onClick={() => onDeleteItem(baseItem.value)}
      className="rounded-pill"
    >
      {baseItem.label}
      <CrossIcon />
    </Button>
  );
}
