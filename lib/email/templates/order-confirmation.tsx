// lib/email/templates/order-confirmation.tsx
import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Hr,
  Link,
} from '@react-email/components';

/**
 * Props for the order confirmation email template
 */
export interface OrderConfirmationEmailProps {
  /** Customer's display name */
  customerName: string;

  /** Edition name to display (e.g., "Black Edition" or "White Edition") */
  editionName: string;

  /** Amount paid in cents (will be formatted to dollars) */
  amountPaid: number;

  /** Shipping region for delivery estimate */
  shippingRegion: 'MX' | 'INTL';
}

/**
 * Format cents to dollar display string
 */
function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars);
}

/**
 * Get delivery estimate based on shipping region
 */
function getDeliveryEstimate(region: 'MX' | 'INTL'): string {
  switch (region) {
    case 'MX':
      return 'Estimated delivery: 2-3 weeks';
    case 'INTL':
      return 'Estimated delivery: 4-6 weeks';
    default:
      return 'Estimated delivery: 4-6 weeks';
  }
}

/**
 * Order confirmation email template
 * Minimal luxury aesthetic with black background and white text
 */
export function OrderConfirmationEmail({
  customerName,
  editionName,
  amountPaid,
  shippingRegion,
}: OrderConfirmationEmailProps) {
  const formattedPrice = formatPrice(amountPaid);
  const deliveryEstimate = getDeliveryEstimate(shippingRegion);

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* TEMB Logo - Text based for simplicity */}
          <Section style={logoSection}>
            <Text style={logoText}>TEMB</Text>
            <Text style={tagline}>THE ELECTRONIC MUSIC BOOK</Text>
          </Section>

          <Hr style={divider} />

          {/* Main Heading */}
          <Section style={contentSection}>
            <Text style={heading}>Thank you for your purchase</Text>

            <Text style={greeting}>Dear {customerName},</Text>

            <Text style={paragraph}>
              Your order has been confirmed and we are preparing your edition for shipment.
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderDetailsSection}>
            <Text style={sectionTitle}>Order Details</Text>

            <Section style={detailRow}>
              <Text style={detailLabel}>Edition</Text>
              <Text style={detailValue}>{editionName}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={detailLabel}>Amount Paid</Text>
              <Text style={detailValue}>{formattedPrice}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={detailLabel}>Shipping</Text>
              <Text style={detailValue}>
                {shippingRegion === 'MX' ? 'Mexico' : 'International'}
              </Text>
            </Section>

            <Section style={detailRow}>
              <Text style={detailLabel}>Delivery</Text>
              <Text style={detailValue}>{deliveryEstimate}</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Additional Information */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              Each TEMB edition is carefully crafted and quality checked before shipping.
              You will receive a shipping confirmation with tracking information once your
              order has been dispatched.
            </Text>
          </Section>

          {/* Contact Information */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Questions? Contact us at{' '}
              <Link href="mailto:orders@theelectronicmusicbook.com" style={link}>
                orders@theelectronicmusicbook.com
              </Link>
            </Text>

            <Text style={copyright}>
              © 2024 The Electronic Music Book. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Email styles - inline for email client compatibility
const main = {
  backgroundColor: '#000000',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '40px',
};

const logoText = {
  fontSize: '32px',
  fontWeight: '300',
  letterSpacing: '8px',
  color: '#FFFFFF',
  margin: '0',
  marginBottom: '8px',
};

const tagline = {
  fontSize: '12px',
  fontWeight: '400',
  letterSpacing: '2px',
  color: '#888888',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const divider = {
  borderColor: '#333333',
  borderStyle: 'solid',
  borderWidth: '1px 0 0 0',
  margin: '30px 0',
};

const contentSection = {
  marginBottom: '30px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '300',
  color: '#FFFFFF',
  marginBottom: '24px',
  marginTop: '0',
  textAlign: 'center' as const,
};

const greeting = {
  fontSize: '16px',
  color: '#FFFFFF',
  marginBottom: '16px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#CCCCCC',
  marginBottom: '16px',
};

const orderDetailsSection = {
  backgroundColor: '#111111',
  borderRadius: '4px',
  padding: '24px',
  marginBottom: '30px',
};

const sectionTitle = {
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  color: '#888888',
  marginBottom: '20px',
  marginTop: '0',
};

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
};

const detailLabel = {
  fontSize: '14px',
  color: '#888888',
  margin: '0',
  display: 'inline-block',
  width: '40%',
};

const detailValue = {
  fontSize: '14px',
  color: '#FFFFFF',
  margin: '0',
  display: 'inline-block',
  width: '60%',
  textAlign: 'right' as const,
  fontWeight: '500',
};

const footerSection = {
  textAlign: 'center' as const,
  marginTop: '40px',
};

const footerText = {
  fontSize: '13px',
  color: '#888888',
  marginBottom: '16px',
};

const link = {
  color: '#FFFFFF',
  textDecoration: 'underline',
};

const copyright = {
  fontSize: '11px',
  color: '#666666',
  marginTop: '20px',
};

// Export default for Resend compatibility
export default OrderConfirmationEmail;