import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(query = '') {
    const res = await api.get('api/posts' + query)
    logger.log(res.data)
    AppState.posts = res.data
  }
}

export const postsService = new PostsService()