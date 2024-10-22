// this is a long form cron job that will be run based on level fo intensity they set.
// it will check for new posts and send messages to the users accordingly
// in the ideal scenario it pulls the data of the most engaged users in a specific community,
// we use that information to read thru the different posts they have collectively made
// and then we send them messages based on the intensity of the community engagement

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: 'not yet implemented' })
}
