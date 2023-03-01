import {Row, Col, CardGroup} from "react-bootstrap";
import {TCollection} from 'api/collections'
import CollectionCard from "../CollectionCard/CollectionCard";
import CardCover from "../../../components/images/CardCover";

type Props = {
    collections: TCollection[],
    onOpenCollection: (id: string) => void,
    onSubmitCollection?: (form: any) => void
    onChangeCollection?: (data: Partial<FormData>) => void
    errors?: any
}

export default function CollectionsList(props: Props) {
    const {collections, onOpenCollection, onSubmitCollection, onChangeCollection, errors} = props
    return (
            <Row  className="g-4">
                {collections.map((collection: any) =>
                    <Col key={collection.id}>
                            <CollectionCard
                                collection={collection}
                                onOpenCollection={(id) => onOpenCollection(id)}
                                onSubmitCollection={onSubmitCollection as (form: any) => void}
                                errors={errors}
                                onChangeCollection={onChangeCollection as (data: Partial<FormData>) => void}
                            />
                    </Col>
                )}
            </Row>
    )
}