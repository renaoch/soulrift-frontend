/**
 * Currency-formatting utilities.
 * Keeps all money values in cents (integers) to avoid FP rounding errors.
 */

export function formatPrice(
  priceInCents: number,
  currency: string = 'USD',
  locale   : string = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style                 : 'currency',
    currency,
    minimumFractionDigits : 0,
    maximumFractionDigits : 2,
  }).format(priceInCents / 100);           // convert cents → major units
}

/**
 * Returns “$25 – $40” for ranges or a single price if min === max
 */
export function formatPriceRange(
  min: number,
  max: number,
  currency = 'USD',
  locale   = 'en-US',
): string {
  return min === max
    ? formatPrice(min, currency, locale)
    : `${formatPrice(min, currency, locale)} – ${formatPrice(max, currency, locale)}`;
}
