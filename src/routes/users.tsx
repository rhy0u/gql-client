import { useQuery, gql, useMutation } from "@apollo/client"
import { Box, Button, Paper, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const GET_USERS = gql`
  query Users {
    users {
      id
      userName
      posts {
        id
        title
      }
    }
  }
`
const ADD_USERS = gql`
  mutation AddUser($user: UserCreateInput!) {
    addUser(user: $user) {
      id
      userName
      posts {
        id
        title
      }
    }
  }
`
const Home = () => {
  const { loading, data, error } = useQuery<GET_USERS_TYPE>(GET_USERS)
  const [addUser] = useMutation<ADD_USER_TYPE>(ADD_USERS, {
    refetchQueries: ["Users"],
  })
  const [userName, setuserName] = useState("")

  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await addUser({
      variables: {
        user: {
          userName,
        },
      },
    })
  }

  return (
    data?.users && (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {data.users.map((user) => (
            <Paper
              key={`user-${user.id}`}
              elevation={2}
              sx={{ padding: "16px", backgroundColor: "#ddd" }}
            >
              <div>
                <Link to={`/user/${user.id}`}>
                  <h3>{user.userName}</h3>
                </Link>
                {user.posts.map((post) => (
                  <p key={`post-${post.id}`}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </p>
                ))}
              </div>
            </Paper>
          ))}
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="userName"
              name="userName"
              label="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <Button type="submit" variant="outlined">
              add user
            </Button>
          </Box>
        </form>
      </div>
    )
  )
}

export default Home
