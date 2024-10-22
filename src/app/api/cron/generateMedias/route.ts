// pages/api/checkUnpaidUsers.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { releaseLock, tryToGetLock } from '@/lib/cronLock'
import { generateMediasCron } from '@/lib/cron/generateMediasCron'

const JOB_NAME = 'generateMedias'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await tryToGetLock(JOB_NAME)

    const results = await generateMediasCron()

    res
      .status(200)
      .json({ message: 'OG images generation jobs processed', results })
  } catch (error) {
    return res.status(409).json({ message: (error as Error).message })
  } finally {
    await releaseLock(JOB_NAME)
  }
}
