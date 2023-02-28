import {Row, Col} from "react-bootstrap";
import Collection from "../Collection";
import {TCollection} from 'api/collections'

export default function CollectionsList({collections, onOpenCollection}: { collections: TCollection[], onOpenCollection: (id: string) => void }) {
    return (
        <>
            <h3 className="text-center mt-3 mb-5 ">My collections</h3>
            <Row xs={1} sm={2} md={2} lg={3} xxl={4} className="g-4">
                {collections.map((collection: any) =>
                    <Col key={collection.id}>
                        <Collection  collection={collection} onOpenCollection={(id) => onOpenCollection(id)}/>
                    </Col>
                )}
            </Row>
        </>
    )
}