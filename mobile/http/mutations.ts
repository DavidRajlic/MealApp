import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview, Login, postReview, PostReviewBody, PutReviewBody, Register, updateReview, voteReview, VoteReviewBody } from "./api";
import { useUser } from "../context/UserContext";


// reviews
export function useCreateReviewMutation() {
  const queryClient = useQueryClient()
  const {getToken} = useUser()
  const token = getToken();
  
  return useMutation({
    mutationFn: (body: PostReviewBody) => postReview(token!, body),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['userReviews', { userId: variables.user }]})
      queryClient.invalidateQueries({ queryKey: ['resturantReviews', { resturantId: variables.restaurant }]})
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
      queryClient.invalidateQueries({ queryKey: ['userReviews', { userId: data.user._id }]})
      queryClient.invalidateQueries({ queryKey: ['resturantReviews', { resturantId: data.restaurant._id }]})
    }
  })
}

interface UpdateReview extends VoteReviewBody {
  reviewId: string
}

export function useVoteReviewMutation() {
  const queryClient = useQueryClient()
  const {getToken} = useUser()
  const token = getToken();

  return useMutation({
    mutationFn: (data: UpdateReview) => voteReview(token!, data.reviewId, data),
    onSuccess(data, variables, context) {
      //queryClient.invalidateQueries({ queryKey: ['userReviews', { userId: data.user._id }]})
      //queryClient.invalidateQueries({ queryKey: ['resturantReviews', { resturantId: data.restaurant._id }]})
    }
  })
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: {reviewId: string}) => deleteReview(data.reviewId),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['userReviews', { userId: data.deletedReview.user }]})
      queryClient.invalidateQueries({ queryKey: ['resturantReviews', { resturantId: data.deletedReview.restaurant }]})
    }
  })
}