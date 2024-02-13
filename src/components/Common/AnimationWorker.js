// Listen for messages from the main thread
self.addEventListener('message', (e) => {
    const { action, payload } = e.data;
    switch (action) {
      case 'calculateNewRadius':
        // Extract the current and target radius from the payload
        const { currentRadius, targetRadius } = payload;
        
        // Apply easing and calculate the new radius
        const newRadius = calculateNewRadius(currentRadius, targetRadius);
  
        // Send the new radius back to the main thread
        self.postMessage({ action: 'updateRadius', newRadius });
        break;
      // Add other cases as needed
    }
  });
  
  function calculateNewRadius(currentRadius, targetRadius) {
    // Easing factor, adjust as needed for smoother transitions
    const easingFactor = 0.1;
  
    // Calculate the difference and apply easing
    const difference = targetRadius - currentRadius;
    const easedDifference = difference * easingFactor;
  
    // Calculate and return the new radius
    return currentRadius + easedDifference;
  }
  
  // Example easing function (could be customized based on your animation needs)
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  
  // Example linear interpolation function
  function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
  }
  