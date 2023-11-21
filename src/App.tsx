import { ApolloProvider } from "@apollo/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GlobalStyles from "@mui/material/GlobalStyles"
import Users from "~/routes/users"
import Root from "~/routes/root"
import Post, { loader as loaderPost } from "~/routes/post"
import User, { loader as loaderUser } from "./routes/user"
import NewPost, { loader as loaderNewPost } from "~/routes/newPost"
import { client } from "./graphql"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/posts/:postId",
        loader: loaderPost,
        element: <Post />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/newPost/:userId",
        loader: loaderNewPost,
        element: <NewPost />,
      },
      {
        path: "/user/:userId",
        loader: loaderUser,
        element: <User />,
      },
    ],
  },
])

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles styles={{ body: { fontFamily: "roboto" } }} />
      <RouterProvider router={router}></RouterProvider>
    </ApolloProvider>
  )
}

export default App
