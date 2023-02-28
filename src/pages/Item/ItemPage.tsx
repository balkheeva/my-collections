import {getItem, TItem} from "../../../api/items";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";


export default function ItemPage(){
    const params = useParams() as { id: string }
    const queryKey = 'items' + params.id
    const {data: item} = useQuery<TItem>(queryKey, () => getItem(params.id))

    const handleEditItem = () => {

    }
    return (
        <>
            <h2>Name: {item?.name}</h2>
            <h4>Tags</h4>
            {item?.tags.map(tag => <div>Tags{tag.name}</div>)}
        </>
    )
}