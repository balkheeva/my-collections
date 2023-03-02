import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { TItem, loadItems } from '../../../api/items';
import { formatDate } from '../../../infrastructure/helpers/formatDate';
import TagCloud from '../../tags/TagBadges';

type Props = {
  items: TItem[];
};

export default function RecentlyAddedItems(props: Props) {
  const { items } = props;
  return (
    <>
      <h3 className="text-center">
        <FormattedMessage id="app.home.title1" />
      </h3>
      <Container className="rounded-3 shadow-sm p-3 mt-3 bg-light">
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <NavLink to={`/collection/${item.Collection.id}`}>
                    {item.Collection.name}
                  </NavLink>
                </td>
                <td>
                  <NavLink to={`/item/${item.id}`}>{item.name}</NavLink>
                </td>
                <td>
                  <TagCloud tags={item.tags} />
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatDate(item.updatedAt)}</td>
                <td>{item.Collection.author.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
