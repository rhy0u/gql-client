import { useSuspenseQuery, gql } from "@apollo/client"
import { Box, Button } from "@mui/material"
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"

const GET_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      posts {
        id
        title
      }
    }
  }
`

export const loader = (args: LoaderFunctionArgs) => args.params

const Home = () => {
  const { userId } = useLoaderData() as { userId: string }
  const { data, error } = useSuspenseQuery<GET_USER_TYPE>(GET_USER, {
    variables: { userId },
  })

  if (error) return <p>Error : {error.message}</p>

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>{data?.user.email}</h3>
      {data?.user.posts.map((post) => (
        <>
          <Link key={`post-${post.id}`} to={`/posts/${post.id}`}>
            {post.title}
          </Link>
          <br />
        </>
      ))}

      <Link to={`/newPost/${userId}`}>
        <Button variant="outlined">new post</Button>
      </Link>
    </Box>
  )
}

export default Home
