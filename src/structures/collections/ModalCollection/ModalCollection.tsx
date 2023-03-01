import {Button, Form, Image, Modal} from "react-bootstrap";
import InputForm from "../../../components/InputForm/InputForm";
import ReactMarkdown from 'react-markdown'
import {useEffect, useState} from "react";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import {findThemes, TThemes} from "../../../api/themes";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import styles from './ModalCollection.module.scss'
import DeleteIcon from "../../../components/icons/DeleteIcon";

type Props = {
    initialValues?: any
    onFormSubmit: (form: any) => void,
    onClose: () => void,
    show: boolean,
    errors: {},
}

export default function ModalCollection(props: Props) {
    const {onFormSubmit, onClose, show, errors, initialValues} = props
    const {id, name, description, themes, image, items} = initialValues
    const [values, setValues] = useState( {id, name, description, themes, image, items} )
    const mapTheme = (theme: TThemes) => ({value: theme.id, label: theme.name})
    const [showDropDown, setShowDropDown] = useState(false)
    const handleChange = (data: any) => {
        setValues({...values, ...data})
    }
    const handleChangeTheme = (data: any)=> {
        setValues({...values, themes: data?.map((item:any) => ({id: item.value, name: item.label}) )})
    }
    const handleLoadThemes = async(searchValue: string) => {
        const themes = await findThemes({name: searchValue})
        return themes?.map(mapTheme)
    }
    const handleChangeImage = (data: any) => {
        setValues({...values, image: data.fileUrl})
    }

    const handleDeleteImage = async () => {
        setValues({...values, image: null})
        setShowDropDown(true)
    }

    const uploader = Uploader({ apiKey: "public_FW25b5B68EAbYaWNGipBqp2FUfFo" });
    const uploaderOptions = {
        multi: false,
        showFinishButton: true,
        mimeTypes: ["image/jpeg", "image/png", "image/webp"],
        showRemoveButton: true,
        styles: {
            colors: {
                primary: "#377dff"
            }
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Edit' : 'Create'} collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {(showDropDown || !initialValues.image) && (
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={files => handleChangeImage(files[0])}
                            onComplete={files => handleChangeImage(files[0])}
                            width="600px"
                            height="375px"
                        />
                    )}
                    {initialValues.image && (<InitialImage imageSrc={values.image} onDelete={handleDeleteImage}/>)}
                    <MultiSelect
                        values={values.themes?.map(mapTheme)}
                        onChange={handleChangeTheme}
                        onLoadItems={handleLoadThemes}
                        title="Themes"
                    />
                    <InputForm
                        name="name"
                        placeholder="Name"
                        type="text"
                        label="Name"
                        values={values}
                        errors={errors}
                        onChange={handleChange}
                    />
                    <InputForm
                        name="description"
                        placeholder="description"
                        as="textarea"
                        label="Description"
                        values={values}
                        errors={errors}
                        onChange={handleChange}
                    />
                    {values.description && <h5 className="mt-3 pt-2 pb-2 border-top">Description markdown preview</h5>}
                    <ReactMarkdown>{values.description}</ReactMarkdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onFormSubmit(values)}>{id ? 'Edit' : 'Create'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

type PropsImage = {
    imageSrc: string,
    onDelete: () => void
}

export function InitialImage(props: PropsImage) {
    const {imageSrc, onDelete} = props
    return (
        <div className={styles.container}>
            <Image src={imageSrc} className={styles.image}/>
            <div className={styles.overlay}></div>
            <Button
                variant="link"
                className={styles.deleteBtn}
                onClick={onDelete}>
                <DeleteIcon/>
            </Button>
        </div>
    )
}