import { post } from '../infrastructure/helpers/http';

export function search(query: string): any {
  return post('/search', { query });
}
