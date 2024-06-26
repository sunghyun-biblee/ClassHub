import React, { useState } from "react";
import { commentType, prevData } from "./CommuDetail";

import { useAuth } from "hooks/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, updateComment } from "../hooks/commentFn";

interface ICommentProp {
  item: commentType;
  id: number;
  postUserId: number;
}

export const CommentItem = ({ item, id, postUserId }: ICommentProp) => {
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<string | number>("");
  const CommentDeleteMutation = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deleteComment,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetailComment", id],
      });
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetailComment", id],
      });

      const prevData: prevData | undefined = queryClient.getQueryData([
        "commuDetailComment",
        id,
      ]);
      queryClient.setQueryData(
        ["commuDetailComment", id],
        (oldData: prevData | undefined) => {
          if (oldData) {
            const newData = oldData.data.filter(
              (item) => item.commentId !== commentId
            );
            return newData;
          }
          return oldData;
        }
      );

      return { prevData };
    },
  });
  const CommentUpdateMutation = useMutation({
    mutationKey: ["updateComment"],
    mutationFn: (requestObj: commentType) =>
      updateComment(requestObj, userData.userId),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetailComment", id],
      });
    },
    onMutate: async (requestObj) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetailComment", id],
      });

      const prevData: prevData | undefined = queryClient.getQueryData([
        "commuDetailComment",
        id,
      ]);
      queryClient.setQueryData(
        ["commuDetailComment", id],
        (oldData: prevData | undefined) => {
          if (oldData) {
            const updateData = oldData.data.map((item) =>
              item.commentId === requestObj.commentId
                ? { ...item, ...requestObj }
                : item
            );

            return updateData;
          }
          return oldData;
        }
      );

      return { prevData };
    },
  });
  const handleChangeEditComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };
  const handleUpdateComment = (item: commentType) => {
    if (editComment) {
      const requestObj: commentType = { ...item, text: editComment };
      CommentUpdateMutation.mutate(requestObj);
      setIsEdit(false);
    }
  };

  return (
    <li className="border-b-[1px] py-1 px-3 flex flex-col my-1 justify-between">
      <div className="flex items-center justify-between">
        <div>
          <strong className="py-2 mr-1">{item.nickname}</strong>
          {userData && userData.userId === postUserId && (
            <span className="text-[10px] text-gray-400 border-[1px] rounded-lg px-1 bg-gray-500/30">
              작성자
            </span>
          )}
        </div>
        <span className="text-gray-600 font-semibold">{item.regDate}</span>
      </div>
      <div className="flex justify-between pt-3 pb-1 items-end">
        {userData &&
        isEdit &&
        userData.userId === item.userId &&
        item.commentId === editCommentId ? (
          <input
            type="text"
            value={editComment}
            onChange={handleChangeEditComment}
            className="border-[1px] py-1 px-2 rounded-md w-[70%]"
          />
        ) : (
          <span className="py-1 w-[75%]">
            {CommentUpdateMutation.isPending ? "업데이트중" : item.text}
          </span>
        )}
        <div className="text-gray-500 font-semibold">
          {userData && userData.userId === item.userId && (
            <>
              {isEdit ? (
                <>
                  <button
                    className="text-sm mr-2"
                    onClick={() => {
                      handleUpdateComment(item);
                    }}
                  >
                    확인
                  </button>
                  <button className="text-sm" onClick={() => setIsEdit(false)}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-sm mr-2"
                    onClick={() => {
                      setEditCommentId(item.commentId);
                      setEditComment(item.text);
                      if (isEdit) {
                        setIsEdit(false);
                      } else {
                        setIsEdit(true);
                      }
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="text-sm"
                    onClick={() => CommentDeleteMutation.mutate(item.commentId)}
                  >
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};
