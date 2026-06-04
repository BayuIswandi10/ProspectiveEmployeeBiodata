import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/biodataService';

export const useAdminCandidates = (params) => {
  return useQuery({
    queryKey: ['adminCandidates', params],
    queryFn: async () => {
      const res = await adminService.getAllCandidates(params);
      return res.data;
    },
    keepPreviousData: true,
  });
};

export const useAdminCandidateDetail = (id) => {
  return useQuery({
    queryKey: ['adminCandidateDetail', id],
    queryFn: async () => {
      const res = await adminService.getCandidateDetail(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteCandidate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminCandidates'] }),
  });
};
