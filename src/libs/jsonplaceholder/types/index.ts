export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface CreatePostData {
  title: string
  body: string
  userId: number
}

export interface UpdatePostData {
  id: number
  title: string
  body: string
  userId: number
}
