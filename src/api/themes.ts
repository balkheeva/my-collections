import { post } from '../infrastructure/helpers/http';

export type TThemes = { id: number; name: string };

export function loadThemes() {
  return post<TThemes[]>('/themes/');
}
export function findThemes(data: Record<string, unknown>) {
  return post<TThemes[]>('/themes/find', data);
}
