import {Button, Form, Modal} from "react-bootstrap";
import InputForm from "../../../components/InputForm/InputForm";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import {findTags, TTags} from "../../../api/tags";
import {useState} from "react";
import {useParams} from "react-router-dom";

export default function ModalItem(props: {
    initialValues?: any,
    onFormSubmit: (form: any) => void,
    onClose: () => void,
    show: boolean,
    errors: {}
}) {
    const {initialValues = {}, onFormSubmit, onClose, show } = props
    const {id, name, tags, collectionId} = initialValues
    const [values, setValues] = useState( {id, name, tags, collectionId} )
    const mapTag = (tag: TTags) => ({value: tag.id, label: tag.name})
    const params = useParams() as { id: string }
    const [errors, setErrors] = useState({})
    const handleChange = (data: Partial<FormData>) => {
        setErrors(Object.keys(data).reduce((acc, k) => ({...acc, [k]: null}), {...errors}))
        setValues({...values, ...data, collectionId: params.id})
    }
    const handleLoadTags = async(searchValue: string) => {
        const tags = await findTags({name: searchValue})
        return tags?.map(mapTag)
    }
    const handleChangeTag = (data: any)=> {
        setValues({...values, tags: data?.map((item:any) => ({id: item.value, name: item.label}) )})
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputForm
                        name="name"
                        placeholder="Name"
                        type="text"
                        label="Name"
                        values={values}
                        errors={errors}
                        onChange={handleChange}
                    />
                    <MultiSelect values={values.tags?.map(mapTag)} onLoadItems={handleLoadTags} onChange={handleChangeTag}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onFormSubmit(values)}>{id ? 'Edit' : 'Create'}</Button>
            </Modal.Footer>
        </Modal>
    )
}