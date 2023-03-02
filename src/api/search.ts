import { post } from '../infrastructure/helpers/http';

export function search(data: string) {
  return post('/search', { q: data });
}
export function searchByQuery(query: string | null) {
  return post(`/search/by-query/?query=${query}`);
}
