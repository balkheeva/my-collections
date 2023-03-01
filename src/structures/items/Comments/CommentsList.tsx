import {Stack, Button} from "react-bootstrap";
import {formatDate} from "../../../infrastructure/helpers/formatDate";
import {TComment} from "../../../api/comments";
import {useEffect, useState} from "react";

type Props = {
    comments: TComment[]
}
export default function CommentsList(props: Props) {
    const {comments} = props
    const [list, setList] = useState<TComment[]>([])
    const sliced = comments.slice(0, 3)

    useEffect(() => {
        setList(sliced)
    }, [comments])

    const handleShowAllComments = () => {
        setList(comments)
    }
    const showButton = comments.length > list.length && 3
    return (
        <div>

            {comments && list.map((comment: TComment) => (
                <div className="mb-4" key={comment.id}>
                    <Stack direction="horizontal" gap={2} className="align-items-center">
                        <span><strong>{comment.author.name}</strong></span>
                        <small className="text-muted"><small>{formatDate(comment.createdAt)}</small></small>
                    </Stack>
                    <p className="mt-2">{comment.comment}</p>
                </div>
            ))}
            {showButton && (<Button variant="outline-primary" onClick={handleShowAllComments}>See all {comments.length} comments</Button>)}
        </div>
    )
}
