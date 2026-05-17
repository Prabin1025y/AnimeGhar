import {Ratelimit} from '@upstash/ratelimit'
import { redis } from './redis'

export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(30, '60 s'),
    analytics: true,
    prefix: "@animeghar/ratelimit"
})