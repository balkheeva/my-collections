import { useEffect, useState } from 'react';
import { Button, Container, Image, Stack, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useQueryClient } from 'react-query';
import { NavLink, useLocation } from 'react-router-dom';

import { searchByQuery } from '../../api/search';
import noResultsImg from '../../components/images/no-results.png';
import { formatDate } from '../../infrastructure/helpers/formatDate';
import TagCloud from '../../structures/tags/TagBadges';

export default function Search() {
  const [foundItems, setFoundItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    searchByQuery(query).then((data: any) => setFoundItems(data));
  }, [location.search]);

  return (
    <>
      <h3 className="text-center">
        <FormattedMessage id="app.search.title1" />
      </h3>
      <Container className="rounded-3 p-3 mt-3">
        {foundItems.length === 0 && (
          <Stack className="align-items-center">
            <Image src={noResultsImg} style={{ width: '150px' }} />
            <h4 className="text-center mt-3">
              <FormattedMessage id="app.search.title2" />
            </h4>
            <p className="text-center">
              <FormattedMessage id="app.search.text" />
            </p>
          </Stack>
        )}
        {foundItems.length > 0 && (
          <Table responsive className="p-3">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="app.home.table.th1" />
                </th>
                <th>
                  <FormattedMessage id="app.home.table.th2" />
                </th>
                <th>
                  <FormattedMessage id="app.home.table.th3" />
                </th>
                <th>
                  <FormattedMessage id="app.home.table.th4" />
                </th>
                <th>
                  <FormattedMessage id="app.home.table.th5" />
                </th>
                <th>
                  <FormattedMessage id="app.home.table.th6" />
                </th>
              </tr>
            </thead>
            <tbody>
              {foundItems.map((item: any) => (
                <tr key={item._id}>
                  <td>
                    <NavLink to={`/collection/${item._source.collection.id}`}>
                      {item._source.collection.name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/item/${item._id}`}>
                      {item._source.name}
                    </NavLink>
                  </td>
                  <td>
                    <TagCloud tags={item._source.tags} />
                  </td>
                  <td>{formatDate(item._source.createdAt)}</td>
                  <td>{formatDate(item._source.updatedAt)}</td>
                  <td>{item._source.collection.author.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
