import {Button, Form, Modal} from "react-bootstrap";
import InputForm from "../../../components/InputForm/InputForm";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import {createTag, findTags, TTags} from "../../../api/tags";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {TCollection} from "../../../api/collections";

export default function ModalItem(props: {
    collection: TCollection
    initialValues?: any,
    onFormSubmit: (form: any) => void,
    onClose: () => void,
    show: boolean,
}) {
    const {initialValues = {}, onFormSubmit, onClose, show, collection } = props
    const {id, name, tags, CollectionId, optionalFields} = initialValues
    const [values, setValues] = useState( {id, name, tags, CollectionId, optionalFields})
    const mapTag = (tag: TTags) => ({value: tag.id, label: tag.name})
    const params = useParams() as { id: string }
    const [errors, setErrors] = useState({})

    const handleChange = (data: Partial<FormData>) => {
        setErrors(Object.keys(data).reduce((acc, k) => ({...acc, [k]: null}), {...errors}))
        setValues({
            ...values,
            ...data,
            CollectionId: params.id,
        })
    }

    const handleChangeOV = (data: any) => {
        setValues({...values, optionalFields: {...values.optionalFields, ...data}})
    }

    const handleLoadTags = async(searchValue: string) => {
        const tags = await findTags({name: searchValue})
        return tags?.map(mapTag)
    }
    const handleChangeTag = (data: any) => {
        setValues({...values, tags: data?.map((item: any) => ({id: item.value, name: item.label}) )})
    }

    const handleCreateTag = async (data: any) => {
        const newTag = await createTag(data)
        return mapTag(newTag)
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Edit' : 'Create'} item</Modal.Title>
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
                    <MultiSelect
                        values={values.tags?.map(mapTag)}
                        onLoadItems={handleLoadTags}
                        onChange={handleChangeTag}
                        isCreatable
                        onCreate={handleCreateTag}
                        title="Tags"
                    />
                    {collection.optionalFields.map((field:any) => field.type === "Boolean" ?
                        <Form.Select key={field.id} onChange={(e) => handleChangeOV({[field.id]: e.target.value})}>
                            <option>Not chosen</option>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Select>
                        : (
                            <InputForm
                                key={field.id}
                                name={field.id}
                                type={field.type.toLowerCase()}
                                label={field.name}
                                placeholder={field.name}
                                onChange={handleChangeOV}
                                values={values.optionalFields}
                                errors={errors}
                                required={false}
                            />
                        ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onFormSubmit(values)}>{id ? 'Edit' : 'Create'}</Button>
            </Modal.Footer>
        </Modal>
    )
}