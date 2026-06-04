import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { biodataService } from '../services/biodataService';

export const useMyBiodata = () => {
  return useQuery({
    queryKey: ['myBiodata'],
    queryFn: async () => {
      try {
        const res = await biodataService.getMyBiodata();
        return res.data;
      } catch (err) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },
    retry: false,
  });
};

export const useCreateBiodata = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: biodataService.createBiodata,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myBiodata'] }),
  });
};

export const useUpdateBiodata = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => biodataService.updateBiodata(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myBiodata'] }),
  });
};

export const useDeleteBiodata = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: biodataService.deleteBiodata,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myBiodata'] }),
  });
};
