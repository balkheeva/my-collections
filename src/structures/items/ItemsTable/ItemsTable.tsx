import {Table} from "react-bootstrap";
import Item from "../ItemRow/Item";
import {TItem} from "../../../api/items";
import {TCollection} from "../../../api/collections";

type Props = {
    items: TItem[],
    isAuthor: boolean,
    collection: TCollection,
    onDelete?: (form: any) => void
    onSubmit?: (form: any) => void
    optionalFields: Array<{ type: string, id: string, name: string }>
}
export default function ItemsTable(props: Props) {
    const {items, onDelete, optionalFields, collection, onSubmit, isAuthor} = props
    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Tags</th>
                {optionalFields.map((field, index) => <th key={index}>{field.name}</th>)}
                {isAuthor && <th></th>}
            </tr>
            </thead>
            <tbody>
            {items?.map((item) =>
                <Item key={item.id}
                      item={item}
                      onDelete={onDelete as (form: any) => void}
                      optionalFields={optionalFields}
                      collection={collection}
                      onSubmit={onSubmit as (form: any) => void}
                      isAuthor={isAuthor}
                />
            )}
            </tbody>
        </Table>
    )
}