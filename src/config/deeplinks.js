import uri from './uri';

export const uberDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null },
  extraQuery = {}
) => ({
  mobile: uri()
    .protocol('uber')
    .query({
      action: 'setPickup',
      pickup: {
        formatted_address: currentLocation.address,
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      },
      dropoff: {
        formatted_address: endLocation.address,
        longitude: endLocation.longitude,
        latitude: endLocation.latitude
      }
    })
    .build(),
  android: 'com.ubercab',
  ios: 'id368677368'
});

export const kaptenDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null },
  extraQuery = {}
) => ({
  mobile: uri()
    .protocol('chauffeur-p')
    .host('order')
    .query({
      action: 'book',
      pickup: {
        formattedaddress: currentLocation.address,
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      },
      dropoff: {
        formattedaddress: endLocation.address,
        longitude: endLocation.longitude,
        latitude: endLocation.latitude
      },
      source: 'Vetecey',
      ...extraQuery
    })
    .build(),
  android: 'fr.chauffeurprive',
  ios: 'id504597178'
});

export const boltDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null }
) => ({
  mobile: `taxify://action/bookaride?pickup_latitude=${
    currentLocation.latitude
  }&pickup_longitude=${currentLocation.longitude}&dropoff_latitude=${
    endLocation.latitude
  }&dropoff_longitude=${endLocation.longitude}`,
  android: 'ee.mtakso.client',
  ios: 'id675033630',
  noUrl: true
});

export const heetchDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null }
) => ({
  mobile: `heetch://`,
  android: 'com.heetch',
  ios: 'id693137280',
  noUrl: true
});

export const marcelDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null }
) => ({
  mobile: `marcel://reserver/immediate`,
  android: 'com.classco.marcel',
  ios: 'id803227884',
  noUrl: true
});

export const lecabDeeplinks = (
  currentLocation = { address: '', latitude: null, longitude: null },
  endLocation = { address: '', latitude: null, longitude: null }
) => ({
  mobile: `lecab://`,
  android: 'fr.lecab.android',
  ios: 'id898160912',
  noUrl: true
});

export const uberAdditional = [
  {
    name: "product_id",
    field: "product_id"
  }
];
export const kaptenAdditional = [
  {
    name: "product",
    field: "tier"
  },
  {
    name: "price_token",
    field: "price_token"
  }
];
export const boltAdditional = [
  {
    name: "product_id",
    field: "id"
  }
]
export const marcelAdditional = null;
export const heetchAdditional = null;
export const lecabAdditional = null;

export default deeplinks = {
  "uber": {
    "deeplink": uberDeeplinks,
    "additional": uberAdditional
  },
  "kapten": {
    "deeplink": kaptenDeeplinks,
    "additional": kaptenAdditional
  },
  "bolt": {
    "deeplink": boltDeeplinks,
    "additional": boltAdditional
  },
  "marcel": {
    "deeplink": marcelDeeplinks,
    "additional": marcelAdditional
  },
  "heetch": {
    "deeplink": heetchDeeplinks,
    "additional": heetchAdditional
  },
  "lecab": {
    "deeplink": lecabDeeplinks,
    "additional": lecabAdditional
  }
}