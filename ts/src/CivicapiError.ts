
import { Context } from './Context'


class CivicapiError extends Error {

  isCivicapiError = true

  sdk = 'Civicapi'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CivicapiError
}

