import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { Restaurant } from '../../types';

export function useRestaurantsQuery() {
  return useQuery<Restaurant[]>({
    queryKey: ['restaurants-recommended'],
    queryFn: async () => {
      const { data } = await axios.get('/api/resto/recommended');
      // response shape: { success, message, data: { recommendations: [...] } }
      return data?.data?.recommendations ?? [];
    },
    staleTime: 60_000,
  });
}
