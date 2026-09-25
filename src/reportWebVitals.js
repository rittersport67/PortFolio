/**
 * @file src/reportWebVitals.js
 * CRA boilerplate: collects Web Vitals, loading `web-vitals` only on demand.
 */

/**
 * Sends the CLS, FID, FCP, LCP and TTFB metrics to the given callback.
 * Does nothing when no callback is passed (the current case in index.js).
 * @param {Function} [onPerfEntry] - Receives each metric, e.g. `console.log`.
 * @returns {void}
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
