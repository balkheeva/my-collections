import { Container, Image, Stack, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useQuery, useQueryClient } from 'react-query';
import { NavLink, useLocation } from 'react-router-dom';

import { TCollection } from '../../api/collections';
import { TItem } from '../../api/items';
import { search } from '../../api/search';
import noResultsImg from '../../components/images/no-results.png';
import { formatDate } from '../../infrastructure/helpers/formatDate';
import TagCloud from '../../structures/tags/TagBadges';

type SearchItem = {
  id: TItem['id'];
  data: TItem & { collection: TCollection };
  highlight: any;
};

export default function Search() {
  const location = useLocation();

  const queryClient = useQueryClient();
  const query = new URLSearchParams(location.search).get('query') as string;
  const queryKey = 'search' + query;

  const handleInvalidate = () => {
    queryClient.invalidateQueries(queryKey);
  };
  const { data: foundData } = useQuery<SearchItem[]>(
    'search',
    () => search(query),
    { onSuccess: handleInvalidate },
  );

  console.log(foundData);

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search).get('query');
  //   searchByQuery(query).then((data: any) => setFoundItems(data));
  // }, [location.search]);

  return (
    <>
      <h3 className="text-center">
        <FormattedMessage id="app.search.title1" />
      </h3>
      <Container className="rounded-3 p-3 mt-3">
        {foundData?.length === 0 && (
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
        {foundData && foundData?.length > 0 && (
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
              {foundData?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <NavLink to={`/collection/${item.data.collection.id}`}>
                      {item.data.collection.name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/item/${item.id}`}>{item.data.name}</NavLink>
                  </td>
                  <td>
                    <TagCloud tags={item.data.tags} />
                  </td>
                  <td>{formatDate(item.data.createdAt)}</td>
                  <td>{formatDate(item.data.updatedAt)}</td>
                  <td>{item.data.collection.author.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
