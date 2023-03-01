import {Button} from "react-bootstrap";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import TagCloud from "../../tags/TagBadges";
import EditIcon from "../../../components/icons/EditIcon";
import {TItem} from "../../../api/items";
import {TCollection} from "../../../api/collections";
import ModalItem from "../ModalItem/ModalItem";
import {useState} from "react";
import {NavLink} from "react-router-dom";

type Props ={
    item: TItem,
    collection: TCollection,
    onDelete?: (form: any) => void
    onSubmit?: (form: any) => void
    isAuthor: boolean
    optionalFields?: Array<{type:string, id: string, name:string}>
}

export default function Item(props: Props ){
    const {item, onDelete, optionalFields, collection, onSubmit, isAuthor} = props
    const [show, setShow] = useState(false)
    const handleSubmit = (form: any) => {
        onSubmit?.(form)
        setShow(false)
    }
    return (
        <>
            <tr>
                <td>{item.id.slice(0, 6)}</td>
                <td><NavLink to={`/item/${item.id}`}>{item.name}</NavLink></td>
                <td><TagCloud tags={item.tags}/></td>
                {optionalFields?.map((field: any) => <td className="overflow-hidden" style={{textOverflow: 'ellipsis'}} key={field.id}>{item.optionalFields[field.id] || '—'}</td>)}
                {isAuthor && (
                    <td>
                        <Button variant="link" className="p-0 me-2" onClick={() => onDelete?.(item)}>
                            <DeleteIcon/>
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => {
                            setShow(true)
                        }}>
                            <EditIcon/>
                        </Button>
                    </td>
                )}
            </tr>
            <ModalItem
                initialValues={item}
                collection={collection}
                onFormSubmit={handleSubmit}
                onClose={() => setShow(false)}
                show={show}
            />
        </>
    )
}
