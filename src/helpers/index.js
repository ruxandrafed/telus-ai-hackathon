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

export default {
  processALPRResults: processALPRResults
}