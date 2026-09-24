
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CivicapiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CivicapiSDK.test()
    equal(testsdk instanceof CivicapiSDK, true,
      'CivicapiSDK.test() must return a client synchronously')
  })

})
