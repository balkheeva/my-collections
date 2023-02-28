import InputForm from "../../../components/InputForm/InputForm";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {TItem} from "../../../api/items";
import {TUser} from "../../../api/users";



type Props = {
    item: TItem | undefined
    onSubmitComment: (data: any) => void
}

export default function Comments(props: Props) {
    const {item, onSubmitComment} = props
    const [comment, setComment] = useState({})
    const [errors, setErrors] = useState({})
    const handleChangeComment = (data: any) => {
        setComment({...comment, ...data, itemId: item?.id})
    }
    return (
        <>
            <InputForm name="comment" placeholder="Leave a comment" onChange={handleChangeComment} values={comment} errors={errors} as="textarea"/>
            <Button onClick={() => onSubmitComment(comment)}>Submit</Button>
        </>

    )
}