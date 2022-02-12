import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(query = '') {
    const res = await api.get('api/posts' + query)
    // logger.log(res.data)
    AppState.posts = res.data
  }

  async createPost(postBody) {
    const res = await api.post('api/posts', postBody)
    // logger.log(res.data)
    AppState.posts.unshift(res.data)
    Pop.toast("Post was successfully created!", 'success')
  }

  async editPost(updatedPost) {
    const res = await api.put('api/posts/' + updatedPost.id, updatedPost)
    logger.log(res.data)
  }

  async deletePost(postId) {
    await api.delete('api/posts/' + postId)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
    Pop.toast('Post successfully removed!', 'success')
  }
}

export const postsService = new PostsService()