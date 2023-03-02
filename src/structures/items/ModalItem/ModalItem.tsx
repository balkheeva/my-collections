import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { TCollection } from '../../../api/collections';
import { TTags, createTag, findTags } from '../../../api/tags';
import InputForm from '../../../components/InputForm/InputForm';
import MultiSelect from '../../../components/MultiSelect/MultiSelect';

export default function ModalItem(props: {
  collection: TCollection;
  initialValues?: any;
  onFormSubmit: (form: any) => void;
  onClose: () => void;
  show: boolean;
}) {
  const { initialValues = {}, onFormSubmit, onClose, show, collection } = props;
  const { id, name, tags, CollectionId, optionalFields } = initialValues;
  const [values, setValues] = useState({
    id,
    name,
    tags,
    CollectionId,
    optionalFields,
  });
  const mapTag = (tag: TTags) => ({ value: tag.id, label: tag.name });
  const params = useParams() as { id: string };
  const [errors, setErrors] = useState({});

  const handleChange = (data: Partial<FormData>) => {
    setErrors(
      Object.keys(data).reduce((acc, k) => ({ ...acc, [k]: null }), {
        ...errors,
      }),
    );
    setValues({
      ...values,
      ...data,
      CollectionId: params.id,
    });
  };

  const handleChangeOV = (data: any) => {
    setValues({
      ...values,
      optionalFields: { ...values.optionalFields, ...data },
    });
  };

  const handleLoadTags = async (searchValue: string) => {
    const tags = await findTags({ name: searchValue });
    return tags?.map(mapTag);
  };
  const handleChangeTag = (data: any) => {
    setValues({
      ...values,
      tags: data?.map((item: any) => ({ id: item.value, name: item.label })),
    });
  };

  const handleCreateTag = async (data: any) => {
    const newTag = await createTag(data);
    return mapTag(newTag);
  };
  const intl = useIntl();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Edit' : 'Create'} item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputForm
            name="name"
            placeholder={intl.formatMessage({ id: 'app.items.modal.title' })}
            type="text"
            label={intl.formatMessage({ id: 'app.items.modal.title' })}
            values={values}
            errors={errors}
            onChange={handleChange}
          />
          <MultiSelect
            values={values.tags?.map(mapTag)}
            onLoadItems={handleLoadTags}
            onChange={handleChangeTag}
            isCreatable
            onCreate={handleCreateTag}
            title={intl.formatMessage({ id: 'app.items.modal.text1' })}
          />
          {collection.optionalFields.map((field: any) =>
            field.type === 'Boolean' ? (
              <div key={field.id}>
                <label className="mb-1">{field.name}</label>
                <Form.Select
                  className="mb-3"
                  onChange={(e) =>
                    handleChangeOV({ [field.id]: e.target.value })
                  }
                >
                  <option>
                    <FormattedMessage id="app.items.modal.dropdown.item1" />
                  </option>
                  <option>
                    <FormattedMessage id="app.items.modal.dropdown.item2" />
                  </option>
                  <option>
                    <FormattedMessage id="app.items.modal.dropdown.item3" />
                  </option>
                </Form.Select>
              </div>
            ) : (
              <InputForm
                key={field.id}
                name={field.id}
                type={field.type.toLowerCase()}
                label={field.name}
                placeholder={field.name}
                onChange={handleChangeOV}
                values={values.optionalFields}
                errors={errors}
                required={false}
              />
            ),
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onFormSubmit(values)}>
          {id ? 'Edit' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
