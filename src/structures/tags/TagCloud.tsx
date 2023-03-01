import {Button, Stack} from "react-bootstrap";
import {TTags} from "../../api/tags";
import {useNavigate} from "react-router-dom";

type Props = {
    tags: TTags[] | undefined
}

export default function TagCloud(props: Props){
    const {tags} = props
    const navigate = useNavigate()
    const handleClickOnTag = (query: string) => {
        navigate(`/search/?query=${query}`)
    }
    return (
        <Stack direction="horizontal" gap={2} className="justify-content-center">
            {tags?.map(tag => <Button variant="success" onClick={() => handleClickOnTag(tag.name)} key={tag.id}>{tag.name}</Button>)}
        </Stack>
    )
}