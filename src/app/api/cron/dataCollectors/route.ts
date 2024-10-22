import { NextApiRequest, NextApiResponse } from 'next'
import { releaseLock, tryToGetLock } from '@/lib/cronLock'
import { dataCollectorsCron } from '@/lib/cron/dataCollectorsCron'

const JOB_NAME = 'dataCollectors'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await tryToGetLock(JOB_NAME)

    const results = await dataCollectorsCron()
    res
      .status(200)
      .json({ message: 'User data collection jobs processed', results })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  } finally {
    await releaseLock(JOB_NAME)
  }
}
