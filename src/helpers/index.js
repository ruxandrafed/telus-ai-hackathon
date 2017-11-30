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
    "latitude": 49.29,
    "longitude": -123.134,
    "licencePlate": "WM4 5M6",
    "confidence": 90,
    "timestamp": 1412023569936
  },
  {
    "id": 2,
    "latitude": 49.285,
    "longitude": -123.120,
    "licencePlate": "G5D M2D",
    "confidence": 65,
    "timestamp": 1412923067736
  },
  {
    "id": 3,
    "latitude": 49.284,
    "longitude": -123.133,
    "licencePlate": "A5D WM2",
    "confidence": 30,
    "timestamp": 1412923067736
  },
  {
    "id": 4,
    "latitude": 49.283,
    "longitude": -123.112,
    "licencePlate": "B6M WM2",
    "confidence": 78,
    "timestamp": 1412923067736
  },
  {
    "id": 5,
    "latitude": 49.287,
    "longitude": -123.102,
    "licencePlate": "A6M WM2",
    "confidence": 30,
    "timestamp": 1412923067736
  },
  {
    "id": 6,
    "latitude": 49.265,
    "longitude": -123.112,
    "licencePlate": "C6M WM2",
    "confidence": 99,
    "timestamp": 1412923067736
  }
];

const processALPRResults = (results) => {
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

const getColor = (confidenceScore) => {
  if (confidenceScore > 80) {
    return 'green';
  } else if (confidenceScore > 60) {
    return 'orange';
  } else {
    return 'red';
  }
}

export default {
  processALPRResults,
  getIncidents,
  formatDate,
  getColor
}