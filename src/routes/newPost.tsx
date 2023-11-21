import { gql, useMutation } from "@apollo/client"
import { Box, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { FormEvent, useState } from "react"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"

export const loader = (args: LoaderFunctionArgs) => args.params

const ADD_POST = gql`
  mutation AddPost($post: PostCreateInput!) {
    addPost(post: $post) {
      id
    }
  }
`

const NewPost = () => {
  const { userId } = useLoaderData() as { userId: string }
  const [addPost] = useMutation(ADD_POST)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const post = { authorId: userId, title, content }

    return addPost({
      variables: {
        post,
      },
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            name="title"
            id="title"
            variant="outlined"
            label="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="content"
            id="content"
            variant="outlined"
            label="content"
            value={content}
            multiline
            minRows={5}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            publish
          </Button>
        </Box>
      </form>
    </div>
  )
}
export default NewPost
