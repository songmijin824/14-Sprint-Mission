import { useMutation } from '@tanstack/react-query';
import { requestor } from '@/lib/requestor'; // axios 인스턴스



export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ( file:File ) => {
      const formData = new FormData();
      formData.append('image', file);

      const res = await requestor.post<{ url: string }>('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data.url;
    },
  });
};
