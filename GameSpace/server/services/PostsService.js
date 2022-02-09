import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class PostsService {
  async getAllPosts(query = {}) {
    const posts = await dbContext.Posts.find(query).populate('creator', 'name picture')
    return posts
  }

  async getPostById(postId) {
    const foundPost = await dbContext.Posts.findOne({ _id: postId })
    if (!foundPost) {
      throw new BadRequest('That post does not exist.')
    }
    return foundPost
  }

  async createPost(postBody) {
    const createdPost = await dbContext.Posts.create(postBody)
    return createdPost
  }

  async editPost(postId, editedPost) {
    const postToEdit = await this.getPostById(postId)
    if (postToEdit.creatorId.toString() !== editedPost.creatorId) {
      throw new Forbidden('You are not authorized to edit this post.')
    }
    postToEdit.title = editedPost.title || postToEdit.title
    postToEdit.description = editedPost.description || postToEdit.description
    postToEdit.type = editedPost.type || postToEdit.type
    postToEdit.contentUrl = editedPost.contentUrl || postToEdit.contentUrl
    await postToEdit.save()
    return postToEdit
  }

  async removePost(postId, userId) {
    const foundPost = await this.getPostById(postId)
    if (foundPost.creatorId.toString() !== userId) {
      throw new Forbidden('You are not authorized to remove this post.')
    }
    await foundPost.remove()
    return foundPost
  }
}

export const postsService = new PostsService()
