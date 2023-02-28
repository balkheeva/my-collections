import {Form, Table} from "react-bootstrap";
import Item from "../../../structures/collections/Item/Item";
import {TItem} from "../../../api/items";

type Props = {
    items: TItem[],
    onOpen: (id: string) => void
    onDelete: (id: string) => void
}
export default function ItemsTable(props: Props) {
    const {items, onOpen, onDelete} = props
    return (
        <>
            <h4>Items</h4>
            <Table>
                <thead>
                <tr>

                    <th>id</th>
                    <th>Item name</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                {items?.map((item) =>
                    <Item key={item.id} item={item} onOpen={onOpen} onDelete={onDelete}/>
                )}
                </tbody>
            </Table>
        </>
    )
}