
import gtag from '.';

declare var GA_TRACKING_ID : string;

if (GA_TRACKING_ID) {
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);

  window.addEventListener('load', sendPostviewOnLocationChange);
}

function sendPostviewOnLocationChange() {
  let post_path = location.pathname;

  global.setInterval(() => {
    if (post_path === location.pathname) {
      return;
    }

    post_path = location.pathname;
    gtag('config', GA_TRACKING_ID, { post_path });
    console.log(`post view: ${post_path}`);
  }, 300);
}

export = {};

