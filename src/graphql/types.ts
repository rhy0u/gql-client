type GET_POST_TYPE = {
  post: {
    __typename: string
    id: string
    title: string
    content: string
    comments: {
      __typename: string
      id: string
      content: string
    }[]
  }
}

type ADD_COMMENT_TYPE = {
  data: {
    addComment: {
      id: string
      __typename: string
    }
  }
}

type GET_USERS_TYPE = {
  users: [
    {
      __typename: string
      id: string
      userName: string
      posts: {
        __typename: string
        id: string
        title: string
      }[]
    },
  ]
}

type GET_USER_TYPE = {
  user: {
    __typename: "User"
    id: "3"
    userName: "jeason.centaure@kaibee.fr"
    posts: [
      {
        __typename: "Post"
        id: "4"
        title: "test"
      },
    ]
  }
}

type ADD_USER_TYPE = {
  addUser: {
    id: string
    userName: string
    posts: []
    __typename: string
  }
}
