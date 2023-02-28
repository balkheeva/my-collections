import {Button} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
export default function CollectionCard({collection, onOpenCollection}: {collection: any, onOpenCollection: (id: string) => void}) {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="holder.js/100px180"/>
            <Card.Body>
                <Card.Title>{collection.name}</Card.Title>
                <Card.Text>
                    {collection.description}
                </Card.Text>
                <Card.Text>
                    {collection.items.length}
                </Card.Text>
                <Button variant="primary" onClick={() => onOpenCollection(collection.id)}>See items</Button>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Created {collection.created}</small>
            </Card.Footer>
        </Card>
    )
}