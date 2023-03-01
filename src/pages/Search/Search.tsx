import {useEffect, useState} from "react";
import {searchByQuery} from "../../api/search";
import {Container, Table} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import TagCloud from "../../structures/tags/TagBadges";
import {formatDate} from "../../infrastructure/helpers/formatDate";

export default function Search() {
    const [foundItems, setFoundItems] = useState([])
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query')
        searchByQuery(query).then((data: any) => setFoundItems(data))
    }, [location.search])

    return (
        <>
            <h3 className="text-center">Search results</h3>
            <Container className="bg-light rounded-3 shadow-sm p-3 mt-3">
                <Table responsive className="p-3">
                    <thead>
                    <tr>
                        <th>Collection</th>
                        <th>Name</th>
                        <th>Tags</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Author</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foundItems?.map((item: any) => (
                        <tr key={item._id}>
                            <td><NavLink to={`/collection/${item._source.collection.id}`}>{item._source.collection.name}</NavLink></td>
                            <td><NavLink to={`/item/${item._id}`}>{item._source.name}</NavLink></td>
                            <td><TagCloud tags={item._source.tags}/></td>
                            <td>{formatDate(item._source.createdAt)}</td>
                            <td>{formatDate(item._source.updatedAt)}</td>
                            <td>{item._source.collection.author.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}