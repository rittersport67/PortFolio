/**
 * @file src/reportWebVitals.js
 * Boilerplate CRA : collecte les Web Vitals, `web-vitals` n'est chargé qu'à la demande.
 */

/**
 * Transmet les métriques CLS, FID, FCP, LCP et TTFB au callback fourni.
 * Ne fait rien si aucun callback n'est passé (cas actuel dans index.js).
 * @param {Function} [onPerfEntry] - Reçoit chaque métrique, ex. `console.log`.
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
