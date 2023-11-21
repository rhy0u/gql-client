import { gql, useMutation, useSuspenseQuery } from "@apollo/client"
import { Box, Button, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import Comment from "~/components/CommentCard"
import PostCard from "~/components/PostCard"

const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(postId: $postId) {
      id
      title
      content
      comments {
        id
        content
      }
    }
  }
`
const ADD_POST = gql`
  mutation AddComment($comment: CommentCreateInput!) {
    addComment(comment: $comment) {
      id
    }
  }
`

export const loader = (args: LoaderFunctionArgs) => args.params

const Post = () => {
  const { postId } = useLoaderData() as { postId: string }
  const { data, error } = useSuspenseQuery<GET_POST_TYPE>(GET_POST, {
    variables: { postId },
  })
  const [addComment] = useMutation<ADD_COMMENT_TYPE>(ADD_POST, {
    refetchQueries: ["GetPost"],
  })
  const [content, setContent] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    return addComment({
      variables: {
        comment: {
          content,
          postId,
        },
      },
    })
  }

  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <PostCard post={data.post} />
      <div>
        <h2>Comments:</h2>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {data.post.comments.map((comment) => (
            <Comment key={`comment-${comment.id}`} comment={comment} />
          ))}
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <TextField
              id="content"
              name="content"
              label="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              minRows={5}
            />
            <Button type="submit" variant="outlined">
              Publier
            </Button>
          </Box>
        </form>
      </div>
    </div>
  )
}

export default Post
