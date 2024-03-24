require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { donationAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: donationAmount * 100, // Stripe doesnt use dollors, put in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        // need to put in our website's URL 
      // add in our links once deployed
        success_url: '',
        cancel_url: '',
    });

    res.json({ id: session.id });
});

module.exports = router;