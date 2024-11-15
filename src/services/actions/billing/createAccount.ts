'use server'

import { stripe } from '@/lib/stripe'

export const createAccount = async () => {
  const account = await stripe.accounts.create({
    controller: {
      stripe_dashboard: {
        type: 'express'
      },
      fees: {
        payer: 'application'
      },
      losses: {
        payments: 'application'
      }
    }
  })

  return account
}
