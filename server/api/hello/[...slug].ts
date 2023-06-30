import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/test', defineEventHandler(() => 'Hello World'))
router.get('/:name/:id', defineEventHandler((event) => getRouterParams(event)))

export default useBase('/api/hello', router.handler)
