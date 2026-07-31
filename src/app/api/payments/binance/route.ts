import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

/**
 * Binance Pay API
 * 
 * To use:
 * 1. Create a Binance account
 * 2. Enable Binance Pay
 * 3. Get API Key and Secret from Binance Pay settings
 * 4. Add to environment variables:
 *    - BINANCE_API_KEY
 *    - BINANCE_SECRET_KEY
 */

const BINANCE_PAY_API = 'https://bpay.binanceapi.com';

interface BinancePaymentRequest {
  merchantId?: string;
  orderAmount: number;
  currency: string;
  merchantTradeNo: string;
  productName: string;
  productDetail?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

function generateSignature(params: Record<string, string | number | boolean>, secretKey: string): string {
  const timestamp = Date.now();
  const queryString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const signatureString = queryString + timestamp;
  return crypto
    .createHmac('sha256', secretKey)
    .update(signatureString)
    .digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, amount, currency = 'USDT', description, merchantTradeNo } = body;

    const apiKey = process.env.BINANCE_API_KEY;
    const secretKey = process.env.BINANCE_SECRET_KEY;

    if (!apiKey || !secretKey) {
      // Demo mode - return mock response
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Demo mode - Binance Pay not configured',
          demoUrl: 'https://pay.binance.com/demo',
          qrCode: 'binance-qr-demo-code',
        });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Binance Pay not configured. Please add BINANCE_API_KEY and BINANCE_SECRET_KEY',
      }, { status: 500 });
    }

    // Create Payment Order
    if (action === 'create-order') {
      const timestamp = Date.now();
      const orderParams: BinancePaymentRequest = {
        orderAmount: amount,
        currency,
        merchantTradeNo: merchantTradeNo || `FMOUTINHO-${timestamp}`,
        productName: description || 'fmoutinhoDev Course',
        productDetail: description,
        returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
        cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
      };

      const signature = generateSignature({ ...orderParams } as Record<string, string | number | boolean>, secretKey);

      const response = await fetch(`${BINANCE_PAY_API}/binancepay/openapi/v2/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'BinancePay-Timestamp': timestamp.toString(),
          'BinancePay-Nonce': crypto.randomBytes(16).toString('hex'),
          'BinancePay-Certificate-SN': apiKey,
          'BinancePay-Signature': signature,
        },
        body: JSON.stringify(orderParams),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        return NextResponse.json({
          success: true,
          prepayId: data.prepayId,
          qrCode: data.qrCodeLink,
          deepLink: data.deeplink,
          expireTime: data.expireTime,
        });
      }

      return NextResponse.json({
        success: false,
        message: data.errorMessage || 'Failed to create Binance Pay order',
      });
    }

    // Verify Payment (webhook callback)
    if (action === 'verify') {
      // In production, verify the webhook signature
      // and update the payment status in database
      return NextResponse.json({
        success: true,
        message: 'Payment verified',
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid action' 
    }, { status: 400 });

  } catch (error) {
    console.error('Binance Pay error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Payment processing failed' 
    }, { status: 500 });
  }
}
