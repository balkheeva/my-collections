import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { TCollection, loadAllCollections } from '../../api/collections';
import { TItem, loadItems } from '../../api/items';
import { TTags, loadTags } from '../../api/tags';
import CollectionsList from '../../structures/collections/CollectionsList/CollectionsList';
import RecentlyAddedItems from '../../structures/items/RecentlyAddedItems/RecentlyAddedItems';
import TagCloud from '../../structures/tags/TagCloud';

export default function Home() {
  const [items, setItems] = useState<TItem[]>([]);
  const [collections, setCollections] = useState<TCollection[]>([]);
  const [tags, setTags] = useState<TTags[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadItems().then((data) => setItems(data.slice(0, 3)));
    loadAllCollections().then((data) => setCollections(data.slice(0, 3)));
    loadTags().then((data) => setTags(data));
  }, []);
  const handleOpenCollection = (id: string) => {
    navigate(`/collection/${id}`);
  };
  return (
    <>
      {items.length > 0 && <RecentlyAddedItems items={items} />}
      {collections.length > 0 && (
        <div>
          <h3 className="mb-4 mt-5 text-center">Recently added collections</h3>
          <CollectionsList
            collections={collections}
            onOpenCollection={handleOpenCollection}
          />
        </div>
      )}

      <Stack className="mb-5 align-items-center">
        <h3 className="mb-4 mt-5 text-center">Try to find something by tags</h3>
        <TagCloud tags={tags} />
      </Stack>
    </>
  );
}
