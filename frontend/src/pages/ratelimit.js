export const createRateLimiter = (maxAttempts, timeWindow) => {
    const attempts = new Map();

    return (key) => {
      const now = Date.now();
      const userAttempts = attempts.get(key) || [];

      // Filter out attempts outside the time window
      const recentAttempts = userAttempts.filter(time => now - time < timeWindow);

      if (recentAttempts.length >= maxAttempts) {
        return false; // Rate limit exceeded
      }

      // Add current attempt
      recentAttempts.push(now);
      attempts.set(key, recentAttempts);
      return true; // Request allowed
    };
  };