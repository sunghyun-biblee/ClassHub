import { useQuery, useQueryClient } from "@tanstack/react-query";
import { selectCommuinfo } from "./fetchCommuArray";

export interface CommuInfo {
  userId: number;
  nickname: string;
  communityId: number;
  communityType: string;
  title: string;
  text: string;
  regDate: string;
  editDate: string;
  favoriteCount: number;
  commentCount: number;
  imageIds: number[];
  image: string[];
  likeUsers: number[];
}
export function useTargetPost(id: number, category: string) {
  const { data, isLoading, isError, error } = useQuery<CommuInfo, Error>({
    queryKey: ["commuDetail", id],
    queryFn: () => selectCommuinfo(id, category),
  });

  return {
    postData: data,
    isPostLoading: isLoading,
    isPostError: isError,
    postError: error,
  };
}