
import gtag from '.';

declare var GA_TRACKING_ID : string;

if (GA_TRACKING_ID) {
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);

  window.addEventListener('load', sendPageviewOnLocationChange);
}

function sendPageviewOnLocationChange() {
  let page_path = location.pathname;

  global.setInterval(() => {
    if (page_path === location.pathname) {
      return;
    }

    page_path = location.pathname;
    gtag('config', GA_TRACKING_ID, { page_path });
    console.log(`page view: ${page_path}`);
  }, 300);
}

export = {};

