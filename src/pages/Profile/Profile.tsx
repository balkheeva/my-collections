import CollectionsList from "../../structures/collections/CollectionsList/CollectionsList";
import {useContext, useEffect, useState} from "react";
import {useMutation} from "react-query";
import {create, loadByUser} from "../../api/collections";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import ModalCollection from "../../structures/collections/ModalCollection/ModalCollection";
import {authContext} from "../../context/auth/authContext";

const initialValues = {name: '', description: '', themes: []}
export default function Profile() {
    const params = useParams()
    const [collection, setCollection] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const collectionsMutationLoad = useMutation(loadByUser)
    const {mutate, reset, error} = useMutation(create, {onSuccess: () => {collectionsMutationLoad.mutate(params.userId as string)}})
    const collections = collectionsMutationLoad.data || []
    const navigate = useNavigate()
    const {user} = useContext(authContext)

    const handleChange = (data: Partial<FormData>) => {
        setErrors(Object.keys(data).reduce((acc, k) => ({...acc, [k]: null}), {...errors}))
        setCollection({...collection, ...data})
        if (error) reset()
    }
    useEffect(() => {
        collectionsMutationLoad.mutate(params.userId as string)
    }, [])

    const handleOpenCollection = (id: string) => {
        navigate(`/collection/${id}`)
    }
    const handleSubmit = async (form: any) => {
        if (!form.name || !form.description || !form.themes) {
            const errText = 'This field is required'
            setErrors({
                name: !form.name && errText,
                description: !form.description && errText,
                themes: !form.themes && errText
            })
            return;
        }
        await mutate(form)
        reset()
        setShow(false)
    }

    return (
        <>
            {user && <Button variant="primary" onClick={handleShow}>
                Create new collection
            </Button>}
            <ModalCollection
                initialValues={initialValues}
                onFormSubmit={handleSubmit}
                onClose={handleClose}
                show={show}
                errors={errors}
            />
            <h3 className="text-center mt-3 mb-5 ">My collections</h3>
            <CollectionsList
                collections={collections}
                onOpenCollection={handleOpenCollection}
                onSubmitCollection={handleSubmit}
                onChangeCollection={handleChange}
                errors={errors}
            />
        </>
    )
}