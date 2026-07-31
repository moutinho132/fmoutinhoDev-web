import { NextRequest, NextResponse } from "next/server";

/**
 * PayPal Payment API
 * 
 * To use:
 * 1. Create a PayPal Developer account: https://developer.paypal.com/
 * 2. Create a REST API app
 * 3. Get Client ID and Client Secret
 * 4. Add to environment variables:
 *    - PAYPAL_CLIENT_ID
 *    - PAYPAL_CLIENT_SECRET
 *    - PAYPAL_MODE=sandbox (for testing) or live
 */

const PAYPAL_API = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

interface PayPalOrder {
  intent: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }>;
}

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, orderId, amount, currency = 'USD', description } = body;

    // Create Order
    if (action === 'create-order') {
      const accessToken = await getAccessToken();
      
      const order: PayPalOrder = {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description || 'fmoutinhoDev Course',
        }],
      };

      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      
      return NextResponse.json({
        success: true,
        orderId: data.id,
        approvalUrl: data.links?.find((l: { rel: string }) => l.rel === 'approve')?.href,
      });
    }

    // Capture Order (after user approval)
    if (action === 'capture-order' && orderId) {
      const accessToken = await getAccessToken();
      
      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.status === 'COMPLETED') {
        // Here you would save the payment to your database
        // and grant access to the course
        
        return NextResponse.json({
          success: true,
          message: 'Payment completed successfully',
          transactionId: data.purchase_units?.[0]?.payments?.captures?.[0]?.id,
        });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Payment capture failed',
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid action' 
    }, { status: 400 });

  } catch (error) {
    console.error('PayPal payment error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Payment processing failed' 
    }, { status: 500 });
  }
}
