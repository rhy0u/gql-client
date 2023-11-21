import { Paper } from "@mui/material"

type CommentCardProps = {
  id: string
  content: string
}

const CommentCard = ({ comment }: { comment: CommentCardProps }) => {
  return (
    <Paper elevation={2} sx={{ padding: "16px" }}>
      <p>{comment.content}</p>
    </Paper>
  )
}

export default CommentCard
