import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const rawBody = JSON.stringify(req.body.payload, null, 2);
    const endpointSecret = "whsec_815f86ceedd74633d46b8b293c409784406067621c92a683ab0f10f897bd75d0";

    const sig = req.headers['stripe-signature'];
    console.log(typeof sig);

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body.payload, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification error:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(event.type);

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log(paymentIntentSucceeded);
            // Handle payment_intent.succeeded event
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};
