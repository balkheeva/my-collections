import { TCollection } from 'api/collections';
import { CardGroup, Col, Row } from 'react-bootstrap';

import CardCover from '../../../components/images/CardCover';
import CollectionCard from '../CollectionCard/CollectionCard';

type Props = {
  collections: TCollection[];
  onOpenCollection: (id: string) => void;
  onSubmitCollection?: (form: any) => void;
  onChangeCollection?: (data: Partial<FormData>) => void;
  errors?: any;
};

export default function CollectionsList(props: Props) {
  const {
    collections,
    onOpenCollection,
    onSubmitCollection,
    onChangeCollection,
    errors,
  } = props;
  return (
    <Row className="g-4 justify-content-center">
      {collections.map((collection: any) => (
        <Col key={collection.id} lg={6} md={6} xl={4}>
          <CollectionCard
            collection={collection}
            onOpenCollection={(id) => onOpenCollection(id)}
            onSubmitCollection={onSubmitCollection as (form: any) => void}
            errors={errors}
            onChangeCollection={
              onChangeCollection as (data: Partial<FormData>) => void
            }
          />
        </Col>
      ))}
    </Row>
  );
}
