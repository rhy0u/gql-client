import { Paper } from "@mui/material"

type PostProps = {
  id: string
  title: string
  content: string
}

const PostCard = ({ post }: { post: PostProps }) => {
  return (
    <Paper elevation={2} sx={{ padding: "16px" }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </Paper>
  )
}

export default PostCard
