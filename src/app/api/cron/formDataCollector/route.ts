// we check for forms and create a new agent to handle that form.
// the agent asks certain things in a conversational manner. large forms are handlded gracefully.
// agent must have enough context to handle form plus any superset of data it might need.
// maybe even checks user posts in twitter and linkedin to get more context for convincing.

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: 'not yet implemented' })
}
