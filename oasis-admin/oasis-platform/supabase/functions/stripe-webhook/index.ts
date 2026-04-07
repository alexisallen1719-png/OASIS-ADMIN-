import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  try {
    const body = await req.text()
    // Verify Webhook Signature
    const event = await stripe.webhooks.signature.verifyAsync(
      body,
      signature!,
      webhookSecret!,
      cryptoProvider
    )

    console.log(`Webhook Received: ${event.type}`)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      // TODO: Update booking status to 'completed_deposit' in Supabase
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    if (err instanceof Error) {
        return new Response(err.message, { status: 400 })
    }
    return new Response('Webhook Error', { status: 400 })
  }
})
