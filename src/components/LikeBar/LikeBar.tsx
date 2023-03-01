import {TItem} from "../../api/items";
import {Button, Stack} from "react-bootstrap";
import LikeIcon from "../icons/LikeIcon";
import styles from './LikeBar.module.scss'

export default function LikeBar(props: { item: TItem | undefined, onLike: (id: string) => void }) {
    const {item, onLike} = props
    const buttonTitle = Number(item?.likes.length) === 1 ? 'like' : 'likes'
    return (
        <Stack direction="horizontal" className="align-items-center mb-3" gap={2}>
            <Button variant="link" className={styles.like} onClick={() => onLike(item!.id)}><LikeIcon/></Button>
            <span>{item?.likes.length} {buttonTitle}</span>
        </Stack>
    )
}