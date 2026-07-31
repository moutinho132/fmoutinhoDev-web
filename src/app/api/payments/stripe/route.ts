import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe Payment API
 * 
 * To use:
 * 1. Create a Stripe account: https://dashboard.stripe.com/
 * 2. Get your API keys from Developers > API Keys
 * 3. Add to environment variables:
 *    - STRIPE_SECRET_KEY (sk_test_... or sk_live_...)
 *    - STRIPE_PUBLISHABLE_KEY (pk_test_... or pk_live_...)
 *    - STRIPE_WEBHOOK_SECRET
 * 
 * Stripe is recommended for credit/debit card payments worldwide
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, amount, currency = 'usd', productName, successUrl, cancelUrl } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      // Demo mode
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Demo mode - Stripe not configured',
          demoCheckoutUrl: 'https://checkout.stripe.com/demo',
          clientSecret: 'demo_client_secret',
        });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Stripe not configured. Please add STRIPE_SECRET_KEY',
      }, { status: 500 });
    }

    // Create Checkout Session
    if (action === 'create-checkout') {
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'mode': 'payment',
          'payment_method_types[]': 'card',
          'line_items[0][price_data][currency]': currency,
          'line_items[0][price_data][unit_amount]': Math.round(amount * 100).toString(), // Stripe uses cents
          'line_items[0][price_data][product_data][name]': productName || 'fmoutinhoDev Course',
          'line_items[0][quantity]': '1',
          'success_url': successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          'cancel_url': cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
          'customer_email': 'moutinho132@gmail.com', // Pre-fill customer email
        }),
      });

      const session = await response.json();

      if (session.url) {
        return NextResponse.json({
          success: true,
          checkoutUrl: session.url,
          sessionId: session.id,
        });
      }

      return NextResponse.json({
        success: false,
        message: session.error?.message || 'Failed to create checkout session',
      });
    }

    // Create Payment Intent (for custom checkout)
    if (action === 'create-intent') {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'amount': Math.round(amount * 100).toString(),
          'currency': currency,
          'automatic_payment_methods[enabled]': 'true',
          'metadata[product]': productName || 'fmoutinhoDev Course',
        }),
      });

      const intent = await response.json();

      if (intent.client_secret) {
        return NextResponse.json({
          success: true,
          clientSecret: intent.client_secret,
          paymentIntentId: intent.id,
        });
      }

      return NextResponse.json({
        success: false,
        message: intent.error?.message || 'Failed to create payment intent',
      });
    }

    // Verify Payment
    if (action === 'verify') {
      const { sessionId } = body;
      
      const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
        },
      });

      const session = await response.json();

      if (session.payment_status === 'paid') {
        // Here you would save the payment to database
        // and grant access to the course
        
        return NextResponse.json({
          success: true,
          message: 'Payment verified successfully',
          customerEmail: session.customer_details?.email,
          amount: session.amount_total / 100,
        });
      }

      return NextResponse.json({
        success: false,
        message: 'Payment not completed',
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid action' 
    }, { status: 400 });

  } catch (error) {
    console.error('Stripe payment error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Payment processing failed' 
    }, { status: 500 });
  }
}
