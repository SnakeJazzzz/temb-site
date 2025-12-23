/**
 * @file lib/index.ts
 * @description Central export point for all TEMB data structures and types
 */

// Edition exports
export {
  type Edition,
  editions,
  getActiveEditions,
  getEditionById,
  getEditionsSortedByPrice,
  getEditionsByCurrency,
  isEdition,
} from './editions';

// Artist exports
export {
  type Artist,
  artists,
  getAllArtists,
  searchArtists,
  getArtistsSorted,
  getRandomArtists,
  getArtistByName,
  getPaginatedArtists,
  isArtist,
  getArtistStats,
} from './artists';

// Shipping exports
export {
  type ShippingRegion,
  type ShippingRate,
  type ShippingConfig,
  shippingRates,
  shippingConfig,
  getShippingRate,
  getAllShippingRates,
  calculateTotalWithShipping,
  getRegionByCountry,
  isShippingAvailable,
  getEstimatedDeliveryDates,
  formatShippingPrice,
  isShippingRegion,
  isShippingRate,
  REGION_DISPLAY_NAMES,
  CURRENCY_SYMBOLS,
} from './shipping';