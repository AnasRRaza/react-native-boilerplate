import { useMutation } from '@tanstack/react-query';

import { apiClient, USER_ENDPOINTS } from '@/api';
import { ApiResponse } from '@/models';
import { ConnectionStatus } from '@/types/common';

interface RespondFriendRequestPayload {
  status: ConnectionStatus.ACCEPTED | ConnectionStatus.REJECTED;
}

export const useRespondFriendRequest = (friendRequestId: string) => {
  return useMutation({
    mutationKey: ['respond-friend-request', friendRequestId],
    mutationFn: async (
      payload: RespondFriendRequestPayload,
    ): Promise<ApiResponse<null>> => {
      const response = await apiClient.put(
        `${USER_ENDPOINTS.RESPOND_FRIEND_REQUEST}/${friendRequestId}`,
        payload,
      );

      return response.data;
    },
  });
};
