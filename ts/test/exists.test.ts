
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CivicapiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CivicapiSDK.test()
    equal(null !== testsdk, true)
  })

})
