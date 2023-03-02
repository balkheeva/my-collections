import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
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
      <h3 className="text-center">Recently added items</h3>
      <Container className="rounded-3 shadow-sm p-3 mt-3 bg-light">
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
