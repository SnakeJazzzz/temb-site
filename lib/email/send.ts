// lib/email/send.ts
import { Resend } from 'resend';
import { Order, EDITION_ID } from '../db/types';
import OrderConfirmationEmail from './templates/order-confirmation';

/**
 * Result of sending an email
 */
export interface SendEmailResult {
  /** Whether the email was sent successfully */
  success: boolean;

  /** Error message if the send failed */
  error?: string;

  /** Resend's email ID on success */
  emailId?: string;
}

/**
 * Map edition IDs to display names
 */
function getEditionDisplayName(editionId: string): string {
  switch (editionId) {
    case EDITION_ID.BLACK:
      return 'Black Edition';
    case EDITION_ID.WHITE:
      return 'White Edition';
    default:
      // Fallback for any future editions
      return editionId.replace('temb-', '').replace('-edition', '').split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Edition';
  }
}

/**
 * Initialize Resend client with environment variable check
 */
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY not set - email sending disabled');
    return null;
  }

  try {
    return new Resend(apiKey);
  } catch (error) {
    console.error('Failed to initialize Resend client:', error);
    return null;
  }
}

/**
 * Send order confirmation email to customer
 *
 * @param order - The order object from the database
 * @returns SendEmailResult indicating success or failure
 */
export async function sendOrderConfirmation(order: Order): Promise<SendEmailResult> {
  // Check if Resend is configured
  const resend = getResendClient();

  if (!resend) {
    // Graceful fallback when RESEND_API_KEY is not set
    console.log('Email service not configured - would send order confirmation to:', order.customer_email);
    console.log('Order details:', {
      orderId: order.id,
      edition: order.edition_id,
      amount: order.amount_total,
      region: order.shipping_region,
    });

    return {
      success: false,
      error: 'Email service not configured (RESEND_API_KEY missing)',
    };
  }

  try {
    // Prepare email props
    const editionName = getEditionDisplayName(order.edition_id);

    // Use environment variable for FROM address with fallback
    const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    // Send the email
    const { data, error } = await resend.emails.send({
      from,
      to: order.customer_email,
      subject: 'Your TEMB Order Confirmation',
      react: OrderConfirmationEmail({
        customerName: order.customer_name,
        editionName,
        amountPaid: order.amount_total,
        shippingRegion: order.shipping_region as 'MX' | 'INTL',
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    if (!data || !data.id) {
      console.error('Unexpected Resend response:', data);
      return {
        success: false,
        error: 'Invalid response from email service',
      };
    }

    console.log('Order confirmation email sent successfully:', {
      emailId: data.id,
      to: order.customer_email,
      orderId: order.id,
    });

    return {
      success: true,
      emailId: data.id,
    };
  } catch (error) {
    // Handle any unexpected errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send order confirmation email:', errorMessage);

    return {
      success: false,
      error: `Email send failed: ${errorMessage}`,
    };
  }
}

/**
 * Send shipping confirmation email to customer
 * This is a placeholder for future functionality
 *
 * @param order - The order object from the database
 * @param trackingNumber - The shipping tracking number
 * @returns SendEmailResult indicating success or failure
 */
export async function sendShippingConfirmation(
  order: Order,
  trackingNumber: string
): Promise<SendEmailResult> {
  // TODO: Implement shipping confirmation email template
  console.log('Shipping confirmation not yet implemented for order:', order.id);
  console.log('Tracking number:', trackingNumber);

  return {
    success: false,
    error: 'Shipping confirmation email not yet implemented',
  };
}

/**
 * Test email configuration
 * Useful for verifying Resend setup
 *
 * @param recipientEmail - Email address to send test to
 * @returns SendEmailResult indicating success or failure
 */
export async function sendTestEmail(recipientEmail: string): Promise<SendEmailResult> {
  const resend = getResendClient();

  if (!resend) {
    return {
      success: false,
      error: 'Email service not configured (RESEND_API_KEY missing)',
    };
  }

  try {
    // Use environment variable for FROM address with fallback
    const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from,
      to: recipientEmail,
      subject: 'TEMB Email System Test',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
          <h1 style="letter-spacing: 4px; font-weight: 300;">TEMB</h1>
          <p>This is a test email from The Electronic Music Book email system.</p>
          <p style="color: #888;">If you received this, the email configuration is working correctly.</p>
        </div>
      `,
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Failed to send test email',
      };
    }

    return {
      success: true,
      emailId: data?.id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Test email failed: ${errorMessage}`,
    };
  }
}