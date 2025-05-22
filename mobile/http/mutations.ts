import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview, login, postReview, PostReviewBody, PutReviewBody, register, updateReview } from "./api";
import { useUser } from "../context/UserContext";


export function useRegisterMutation() {
  return useMutation({
    mutationFn: register
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login
  })
}

// reviews
export function useCreateReviewMutation() {
  const queryClient = useQueryClient()
  const {getToken} = useUser()
  const token = getToken();
  
  return useMutation({
    mutationFn: (body: PostReviewBody) => postReview(token!, body),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['reviews', { user: variables.user }]})
      queryClient.invalidateQueries({ queryKey: ['reviews', { restaurant: variables.restaurant }]})
    }
  })
}

interface UpdateReview extends PutReviewBody {
  reviewId: string
}

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UpdateReview) => updateReview(data.reviewId, data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['reviews', { user: data.user._id }]})
      queryClient.invalidateQueries({ queryKey: ['reviews', { restaurant: data.restaurant._id }]})
    }
  })
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: {reviewId: string}) => deleteReview(data.reviewId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['reviews', { user: data.deletedReview.user }]})
      queryClient.invalidateQueries({ queryKey: ['reviews', { restaurant: data.deletedReview.restaurant }]})
    }
  })
}