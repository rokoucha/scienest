import { PostService } from './services/post'

export const postService = new PostService(process.env.DB)
