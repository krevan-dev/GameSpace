import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class PostController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAllPosts)
      .get('/:id', this.getPostById)
      // REVIEW Does this need a getById since query above?
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .put('/:id', this.editPost)
      .delete('/:id', this.removePost)
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts(req.query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(req, res, next) {
    try {
      const post = await postsService.getPostById(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newPost = await postsService.createPost(req.body)
      res.send(newPost)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const editedPost = await postsService.editPost(req.params.id, req.body)
      res.send(editedPost)
    } catch (error) {
      next(error)
    }
  }

  async removePost(req, res, next) {
    try {
      const removedPost = await postsService.removePost(req.params.id, req.userInfo.id)
      res.send(removedPost)
    } catch (error) {
      next(error)
    }
  }
}
