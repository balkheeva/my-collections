import RecentlyAddedItems from "../../structures/items/RecentlyAddedItems/RecentlyAddedItems";
import {useEffect, useState} from "react";
import {loadItems, TItem} from "../../api/items";
import {loadAllCollections, TCollection} from "../../api/collections";
import CollectionsList from "../../structures/collections/CollectionsList/CollectionsList";
import {useNavigate} from "react-router-dom";
import {loadTags, TTags} from "../../api/tags";
import {Stack} from "react-bootstrap";
import TagCloud from "../../structures/tags/TagCloud";

export default function Home() {
    const [items, setItems] = useState<TItem[]>([])
    const [collections, setCollections] = useState<TCollection[]>([])
    const [tags, setTags] = useState<TTags[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        loadItems().then(data => setItems(data.slice(0, 3)))
        loadAllCollections().then(data => setCollections(data.slice(0, 3)))
        loadTags().then(data => setTags(data))
    }, [])
    const handleOpenCollection = (id: string) => {
        navigate(`/collection/${id}`)
    }
    return (
        <>
            {items.length > 0 && <RecentlyAddedItems items={items}/>}
            {collections.length > 0 && (
                <div>
                    <h3 className="mb-4 mt-5 text-center">Recently added collections</h3>
                    <CollectionsList collections={collections} onOpenCollection={handleOpenCollection}/>
                </div>
            )}

            <Stack className="mb-5 align-items-center">
                <h3 className="mb-4 mt-5 text-center">Try to find something by tags</h3>
                <TagCloud tags={tags}/>
            </Stack>

        </>

    )
}