import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';

export function useMenusQuery(params?: { q?: string; category?: string; sort?: string }) {
  return useQuery({
    queryKey: ['menus', params],
    queryFn: async () => {
      const { data } = await axios.get('/menus', { params });
      return data; // MenuItem[]
    },
    staleTime: 60_000,
  });
}
