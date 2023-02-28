import {Badge} from "react-bootstrap";
import {TTags} from "../../api/tags";

type Props = {
    tags: TTags[] | undefined
    bg?: string
}

export default function TagCloud(props: Props){
    const {tags, bg} = props
    return (
        <div className="">
            {tags?.map(tag => <Badge pill bg={bg || "success"} key={tag.id}>{tag.name}</Badge>)}
        </div>
    )
}