import { Box, Button, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import Comment from "~/components/CommentCard"
import PostCard from "~/components/PostCard"

// const GET_POST = gql``
// const ADD_POST = gql``

const mockedData = {
  data: {
    post: {
      id: "1",
      title: "Check out Prisma with Next.js",
      content: "https://www.prisma.io/nextjs",
      comments: [
        { id: "1", content: "true", __typename: "Comment" },
        { id: "7", content: "ll", __typename: "Comment" },
        { id: "8", content: "test", __typename: "Comment" },
      ],
      __typename: "Post",
    },
  },
}

export const loader = (args: LoaderFunctionArgs) => args.params

const Post = () => {
  const { postId } = useLoaderData() as { postId: string }
  const { data } = mockedData

  const [content, setContent] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("well it's mocked")
  }

  return (
    data?.post && (
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
  )
}

export default Post
