import { Asset } from 'react-native-image-picker';
import { useMutation } from '@tanstack/react-query';

import { apiClient, ENDPOINTS } from '@/api';
import { ApiResponse } from '@/models';
import { ensureScheme } from '@/utils/media';

type TUploadMediaPayload = {
  file: Asset;
};

type TUploadMediaResponse = {
  id: string;
  key: string;
};

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async (
      data: TUploadMediaPayload,
    ): Promise<ApiResponse<TUploadMediaResponse>> => {
      const file = {
        name: data.file.fileName || 'image.jpg',
        type: data.file.type || 'image/jpeg',
        uri: ensureScheme(data.file.uri || '') || 'image.jpg',
      };

      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(ENDPOINTS.UPLOAD_MEDIA, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data;
    },
  });
};
