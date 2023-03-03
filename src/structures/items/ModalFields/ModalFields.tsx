import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import InputForm from '../../../components/InputForm/InputForm';

type Props = {
  initialValues?: any;
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};
const defaultValues = { type: '', name: '', value: '' };

export default function ModalFields(props: Props) {
  const fields = [
    { type: 'String', name: '' },
    { type: 'Number', name: '' },
    { type: 'Date', name: '' },
    { type: 'Boolean', name: '' },
  ];
  const [errors, setErrors] = useState({});
  const { show, onClose, onSubmit, initialValues = defaultValues } = props;
  const [values, setValues] = useState(initialValues);

  const intl = useIntl();

  const handleChange = (data: any) => {
    setValues({ ...values, ...data });
  };
  const handleChangeType = (data: any) => {
    setValues({ ...values, type: data });
  };
  const handleSubmit = (values: any) => {
    if (!values.type || !values.name) {
      const errText = 'This field is required';
      setErrors({
        type: !values.type && errText,
        name: !values.name && errText,
      });
      return;
    }
    onSubmit(values);
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="app.collection.modal.opfield.title" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select onChange={(e) => handleChangeType(e.target.value)}>
            <option>
              <FormattedMessage id="app.collection.modal.opfield.placeholder1" />
            </option>
            {fields.map((field, index) => (
              <option key={index} value={field.type}>
                {field.type}
              </option>
            ))}
          </Form.Select>
          <InputForm
            name="name"
            placeholder={intl.formatMessage({
              id: 'app.collection.modal.opfield.placeholder2',
            })}
            onChange={handleChange}
            values={values}
            errors={errors}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit(values)}>
          <FormattedMessage id="app.collection.modal.opfield.btn" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
