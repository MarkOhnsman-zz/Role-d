import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { Forbidden } from '../utils/Errors'

export class ValuesController extends BaseController {
  constructor() {
    super('api/values')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .use((req, res, next)=>{
      //   if(!req.permissions.includes('access:enrollments')){
      //     next(new Forbidden("you dont have access to see this content"))
      //   }
      //   next()
      // })
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      return res.send(['value1', 'value2'])
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      let isAdmin = req.userInfo.permissions.includes('create:studentNote')
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }
}
