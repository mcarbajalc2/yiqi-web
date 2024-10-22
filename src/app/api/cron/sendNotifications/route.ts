// pages/api/checkUnpaidUsers.ts

import { sendNotificationCron } from '@/lib/cron/sendNotificationCron'
import { releaseLock, tryToGetLock } from '@/lib/cronLock'
import { NextApiRequest, NextApiResponse } from 'next'

const JOB_NAME = 'sendNotifications'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await tryToGetLock(JOB_NAME)

    await sendNotificationCron()

    res.status(200).json({ message: 'Notifications sent' })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  } finally {
    await releaseLock(JOB_NAME)
  }
}
