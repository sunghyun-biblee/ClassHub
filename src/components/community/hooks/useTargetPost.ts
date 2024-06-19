import { useQuery } from "@tanstack/react-query";
import { selectCommuinfo } from "./fetchCommuArray";

export interface CommuInfo {
  commentCount: number;
  communityId: number;
  communityType: string;
  editDate: string;
  favoriteCount: number;
  image: string[];
  imageIds: number[];
  likeUsers: number[];
  nickname: string;
  regDate: string;
  text: string;
  title: string;
  userId: number;
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
