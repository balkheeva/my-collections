import {Button, Stack} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import {TCollection} from "../../../api/collections";
import {useState} from "react";
import ModalCollection from "../ModalCollection/ModalCollection";
import dayjs from "dayjs";
import calendar from 'dayjs/plugin/calendar'
import ReactMarkdown from "react-markdown";
import placeholderImage from "../../../components/images/cover.png";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";
import {formatDate} from "../../../infrastructure/helpers/formatDate";
dayjs.extend(calendar)

type Props = {
    collection: TCollection,
    onOpenCollection: (id: string) => void,
    onSubmitCollection: (form: any) => void
    onChangeCollection: (data: Partial<FormData>) => void
    errors: any
}

export default function CollectionCard(props: Props) {
    const {collection, onOpenCollection, onSubmitCollection, errors} = props
    const [show, setShow] = useState(false)

    const handleEdit = (form: any) => {
        onSubmitCollection(form)
        setShow(false)
    }
    return (
        <>
            <Card style={{width: '24rem'}}>
                <ImageContainer>{<Card.Img variant="top" src={collection.image ? collection.image : placeholderImage}/>}</ImageContainer>
                <Card.Body>
                    <Card.Title>{collection.name}</Card.Title>
                        <ReactMarkdown>
                            {collection.description}
                        </ReactMarkdown>
                    <Card.Text>
                        <small className="text-muted">Theme: </small>
                        {collection.themes.length !== 0 ? collection.themes.map(theme => theme.name).join(', ') : '(No theme)'}
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted ">Author: </small>
                        {collection.author.name}
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted">Items: </small>
                        {collection.items.length}
                    </Card.Text>

                    <Stack direction="horizontal" className="justify-content-between">
                        <Button variant="primary" onClick={() => onOpenCollection(collection.id)}>Learn more</Button>

                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                        <small className="text-muted">Created {formatDate(collection.createdAt)}</small>
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted">Updated {formatDate(collection.updatedAt)}</small>
                    </Card.Text>
                </Card.Footer>
            </Card>
            {show && <ModalCollection
                initialValues={collection}
                onFormSubmit={handleEdit}
                onClose={() => setShow(false)}
                show={show}
                errors={errors}
            />}
        </>
    )
}