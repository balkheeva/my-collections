import {Badge, Button, Form} from "react-bootstrap";
import {TItem} from "../../../api/items";
import DeleteIcon from "../../../components/icons/DeleteIcon";

type Props ={
    item: TItem,
    onOpen: (id: string) => void
    onDelete: (id: string) => void
}

export default function Item(props: Props){
    const {item, onOpen, onDelete} = props

    return (
        <tr>
            <td>{item.id.slice(0, 6)}</td>
            <td><Button variant="link"  onClick={() => onOpen(item.id)}>{item.name}</Button></td>
            <td>{item.tags.map(tag => <Badge key={tag.id} bg="success">{tag.name}</Badge>)}</td>
            <td><Button variant="link" onClick={() => onDelete(item.id)}><DeleteIcon/></Button></td>
        </tr>
    )
}
