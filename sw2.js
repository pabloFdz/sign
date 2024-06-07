importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

const OFFLINE_HTML = '/offline.html';
const PRECACHE = [
    { url: OFFLINE_HTML, revision: '70f044fda3e9647a98f084763ae2c32a' },
    { url: '/js/utils.js?ts=1301', revision: '5896c977405450cd7eeca3368c16b83d' },
    { url: '/js/sha1.js?ts=1301', revision: '4b27341c673dcfdd40c4b1716d5639ca' },
    { url: '/js/jquery.js?ts=1301', revision: 'b91ab61f1b70dbde2615b549de485d1e' },
    { url: '/js/jquery-ui.js?ts=1301', revision: 'e1e10fb5612791f4549481f95259c15f' },
    { url: '/js/mobile/home_pagev5.js?ts=1301', revision: 'bb57a247e954b280fd779c2c901b5d09' },
    { url: '/js/jquery.fancybox.js?ts=241', revision: '873b4d10658c2684e3ce180de88d6fd4' },
    { url: '/js/swiper-bundle.min.js?ts=1301', revision: 'f019bdd3bebbc3d377ead020ab290a0e' },
    { url: '/css/jquery-ui.css?ts=1201', revision: '412ba2bdd8575cd3c65938a56f00dccb' },
    { url: '/css/jquery.modal.css?ts=1201', revision: '1be8515e9196319f83ff905254e274db' },
    { url: '/css/jquery.fancybox.css?ts=1201', revision: 'ec871beb65631107607070d715d06cbd' },
    { url: '/css/swiper-bundle.min.css?ts=1201', revision: 'afd4dca67aed58f5f03c4a2dc4daf9de' }
];

/**
 * Precache Manifest for resources available offline.
 * https://developers.google.com/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list
 */
workbox.precaching.precacheAndRoute(PRECACHE);

/**
 * Enable navigation preload.
 */
workbox.navigationPreload.enable();

/**
 * Runtime caching for CSS and JS coming from only from the origin
 * https://developers.google.com/web/tools/workbox/modules/workbox-strategies#advanced_usage
 */
/* workbox.routing.registerRoute(
  ({ sameOrigin, url }) => sameOrigin && url.pathname.match(/\.(?:js|css)/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'origin-js-css'
  })
); */

/**
 * Google Fonts caching
 * Learn more: https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
 */
/**
 * Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
 */
workbox.routing.registerRoute(
    /https:\/\/fonts\.googleapis\.com\/*/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google_fonts_stylesheets'
    }),
    'GET'
);
/**
 * Cache the underlying font files with a cache-first strategy for 1 year.
 */
workbox.routing.registerRoute(
    /https:\/\/fonts\.gstatic\.com\/*/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google_fonts_webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                maxEntries: 30
            })
        ]
    }),
    'GET'
);

/**
 * Basic caching for images.
 */
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                // Only cache 80 images.
                maxEntries: 80,
                purgeOnQuotaError: true
            })
        ]
    })
);

/*
 * Fallback to offline HTML page when a navigation request fails.
 */
const htmlHandler = new workbox.strategies.NetworkOnly();
// A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({ event }) => {
    const request = event.request;
    return htmlHandler.handle({ event, request }).catch(() => caches.match(OFFLINE_HTML, {
        ignoreSearch: true
    }));
});
workbox.routing.registerRoute(navigationRoute);

self.addEventListener('install', event => {
    self.skipWaiting();
});