import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { create, loadByUser } from '../../api/collections';
import { authContext } from '../../context/auth/authContext';
import CollectionsList from '../../structures/collections/CollectionsList/CollectionsList';
import ModalCollection from '../../structures/collections/ModalCollection/ModalCollection';

const initialValues = { name: '', description: '', themes: [] };
export default function Profile() {
  const params = useParams();
  const [collection, setCollection] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const collectionsMutationLoad = useMutation(loadByUser);
  const { mutate, reset, error } = useMutation(create, {
    onSuccess: () => {
      collectionsMutationLoad.mutate(params.userId as string);
    },
  });
  const collections = collectionsMutationLoad.data || [];
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  const handleChange = (data: Partial<FormData>) => {
    setErrors(
      Object.keys(data).reduce((acc, k) => ({ ...acc, [k]: null }), {
        ...errors,
      }),
    );
    setCollection({ ...collection, ...data });
    if (error) reset();
  };
  useEffect(() => {
    collectionsMutationLoad.mutate(params.userId as string);
  }, []);

  const handleOpenCollection = (id: string) => {
    navigate(`/collection/${id}`);
  };
  const handleSubmit = async (form: any) => {
    if (!form.name || !form.description || !form.themes) {
      const errText = 'This field is required';
      setErrors({
        name: !form.name && errText,
        description: !form.description && errText,
        themes: !form.themes && errText,
      });
      return;
    }
    await mutate(form);
    reset();
    setShow(false);
  };

  return (
    <>
      <Stack
        direction="vertical"
        className="mt-3 mb-5 justify-content-center align-items-center"
      >
        <h3 className="mb-3">
          <FormattedMessage id="app.profile.title" />
        </h3>
        {user && (
          <Button variant="primary" onClick={handleShow}>
            <FormattedMessage id="app.profile.btn" />
          </Button>
        )}
      </Stack>

      <ModalCollection
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        onClose={handleClose}
        show={show}
        errors={errors}
      />

      <CollectionsList
        collections={collections}
        onOpenCollection={handleOpenCollection}
        onSubmitCollection={handleSubmit}
        onChangeCollection={handleChange}
        errors={errors}
      />
    </>
  );
}
