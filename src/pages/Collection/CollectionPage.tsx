import { useContext, useState } from 'react';
import { Button, Col, Image, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import {
  TCollection,
  addField,
  deleteCollection,
  editCollection,
  getCollection,
} from '../../api/collections';
import { TItem, createItem, deleteItem, editItem } from '../../api/items';
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import SettingsDropDown from '../../components/SettingsDropDown';
import placeholderImage from '../../components/images/cover.png';
import { authContext } from '../../context/auth/authContext';
import { formatDate } from '../../infrastructure/helpers/formatDate';
import ModalCollection from '../../structures/collections/ModalCollection/ModalCollection';
import ItemsTable from '../../structures/items/ItemsTable/ItemsTable';
import ModalFields from '../../structures/items/ModalFields/ModalFields';
import ModalItem from '../../structures/items/ModalItem/ModalItem';
import SortFilterBar from '../../structures/items/SortFilterBar/SortFilterBar';

const initialValues = {
  name: '',
  tags: [],
  collectionId: '',
  optionalFields: {},
};

export default function CollectionPage() {
  const [errors, setErrors] = useState({});
  const [showModalItem, setShowModalItem] = useState(false);
  const [showModalCol, setShowModalCol] = useState(false);
  const [showModalFields, setShowModalFields] = useState(false);
  const navigate = useNavigate();
  const params = useParams() as { id: string };
  const queryClient = useQueryClient();
  const queryKey = 'collection' + params.id;
  const handleInvalidate = () => {
    queryClient.invalidateQueries(queryKey);
  };
  const { data: collection } = useQuery<TCollection>(queryKey, () =>
    getCollection(params.id),
  );
  const collectionsMutationEdit = useMutation(editCollection, {
    onSuccess: handleInvalidate,
  });
  const collectionsMutationDelete = useMutation(deleteCollection, {
    onSuccess: handleInvalidate,
  });
  const { mutate, reset, error } = useMutation(createItem, {
    onSuccess: handleInvalidate,
  });
  const itemMutationDelete = useMutation(deleteItem, {
    onSuccess: handleInvalidate,
  });
  const itemMutationEdit = useMutation(editItem, {
    onSuccess: handleInvalidate,
  });
  const fieldMutation = useMutation(addField, { onSuccess: handleInvalidate });
  const { user } = useContext(authContext);
  const [filters, setFilters] = useState<Record<string, any[]>>({});
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc');
  const items = [...(collection?.items || [])].sort((a: TItem, b: TItem) => {
    if (sortBy === 'asc')
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  const isAuthor = collection?.author.id === user?.id;

  const handleDeleteItem = async (form: any) => {
    await itemMutationDelete.mutate(form);
    itemMutationDelete.reset();
  };
  const handleDeleteCollection = async (id: string) => {
    await collectionsMutationDelete.mutate({ id: id });
    collectionsMutationDelete.reset();
    navigate('/profile');
  };

  const handleEditCollection = async (form: any) => {
    await collectionsMutationEdit.mutate(form);
    collectionsMutationEdit.reset();
    setShowModalCol(false);
  };
  const handleEditItem = async (form: any) => {
    await itemMutationEdit.mutate(form);
    itemMutationEdit.reset();
  };
  const handleSubmitItem = async (form: any) => {
    if (!form.name || !form.tags) {
      const errText = 'This field is required';
      setErrors({ name: !form.name && errText, tags: !form.tags && errText });
      return;
    }
    await mutate(form);
    reset();
    setShowModalItem(false);
  };
  const handleSubmitFields = async (form: any) => {
    fieldMutation.mutate({ ...form, id: params.id });
    fieldMutation.reset();
    setShowModalFields(false);
  };

  const handleFilterBy = (newFilters: Record<string, any[]>) => {
    if (!collection) return;
    setFilters(newFilters);
  };
  if (!collection) return null;
  const activeFilters = Object.keys(filters);
  return (
    <div className="mb-4 bg-light rounded-3 shadow-sm p-4">
      <Row className="align-items-center mb-4">
        <Col xs={12} sm={6} md={5} lg={5} className="align-items-center mb-3">
          <ImageContainer>
            <Image
              src={collection.image ? collection.image : placeholderImage}
              rounded
            />
          </ImageContainer>
        </Col>
        <Col xs={12} sm={6} md={7} lg={7}>
          <Stack direction="horizontal" gap={1}>
            <h1>{collection.name}</h1>
            {isAuthor && (
              <SettingsDropDown
                baseItem={collection}
                onDelete={handleDeleteCollection}
                onEdit={() => setShowModalCol(true)}
              />
            )}
          </Stack>
          <ReactMarkdown>{collection.description}</ReactMarkdown>
          <Stack className="mb-4">
            <small>
              Themes: {collection.themes.map((theme) => theme.name).join(', ')}
            </small>
            <small>Author: {collection.author.name}</small>
            <small>Created {formatDate(collection.createdAt)}</small>
            <small>Updated {formatDate(collection.updatedAt)}</small>
          </Stack>
          {isAuthor && (
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" onClick={() => setShowModalItem(true)}>
                Create new item
              </Button>
              <Button onClick={() => setShowModalFields(true)}>
                Add fields
              </Button>
            </Stack>
          )}
        </Col>
      </Row>
      <SortFilterBar
        items={collection.items}
        sortBy={sortBy}
        onSortBy={setSortBy}
        onFilter={handleFilterBy}
        collection={collection}
      />
      {!collection.items.length ? (
        <h4 className="text-center">No items yet...</h4>
      ) : (
        <ItemsTable
          isAuthor={isAuthor}
          items={items?.filter((item) => {
            if (!activeFilters.length) return true;
            return activeFilters.find((filterKey) => {
              return filters[filterKey].includes(
                item.optionalFields[filterKey],
              );
            });
          })}
          collection={collection}
          onDelete={handleDeleteItem}
          onSubmit={handleEditItem}
          optionalFields={collection.optionalFields}
        />
      )}
      <ModalItem
        collection={collection}
        initialValues={initialValues}
        onFormSubmit={handleSubmitItem}
        onClose={() => setShowModalItem(false)}
        show={showModalItem}
      />
      {showModalCol && (
        <ModalCollection
          onFormSubmit={handleEditCollection}
          onClose={() => setShowModalCol(false)}
          show={showModalCol}
          errors={errors}
          initialValues={collection}
        />
      )}
      <ModalFields
        show={showModalFields}
        onClose={() => setShowModalFields(false)}
        onSubmit={handleSubmitFields}
      />
    </div>
  );
}
