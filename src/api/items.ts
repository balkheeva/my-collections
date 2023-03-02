import { post } from '../infrastructure/helpers/http';
import { TCollection } from './collections';
import { TComment } from './comments';
import { TTags } from './tags';
import { TUser } from './users';

export type TItem = {
  id: string;
  name: string;
  optionalFields: any;
  Collection: TCollection;
  createdAt: string;
  updatedAt: string;
  tags: TTags[];
  comments: TComment[] | undefined;
  author: TUser;
  likes: [];
};

export function createItem(data: Record<string, unknown>) {
  return post<TItem[]>(`/items/create/${data.CollectionId}`, data);
}
export function loadItems() {
  return post<TItem[]>('/items/');
}

export function getItem(id: string) {
  return post<TItem>(`/items/${id}`);
}
export function deleteItem(data: Record<string, unknown>) {
  return post<TItem>('/items/delete', data);
}
export function editItem(data: Record<string, unknown>) {
  return post<TItem>('/items/edit', data);
}
export function likeItem(id: string) {
  return post<TItem>('/items/like', { id });
}
