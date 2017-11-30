const INCIDENTS = [
  {
    "id": 0,
    "latitude": 49.281,
    "longitude": -123.123,
    "licencePlate": "CAHIKER",
    "confidence": 75,
    "timestamp": 1512023859912,
  },
  {
    "id": 1,
    "latitude": 49.35,
    "longitude": -123.87,
    "licencePlate": "WM4 5M6",
    "confidence": 90,
    "timestamp": 1412023569936
  },
  {
    "id": 2,
    "latitude": 49.023,
    "longitude": -129.99,
    "licencePlate": "A5D M2D",
    "confidence": 50,
    "timestamp": 1412923067736
  }
];

const processALPRResults = (results) => {
  console.log('processing results');
  if (results.length > 0) {
    results = results.map(result => {
      return {
        confidence: result.confidence,
        plate: result.plate
      }
    });
  }
  return results;
}

// Would be a call to the API
const getIncidents = () => {
  const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(INCIDENTS);
    }, 1000);
  });
  return promise;
}

export default {
  processALPRResults,
  getIncidents
}