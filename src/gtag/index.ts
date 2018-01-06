
interface DataLayer extends Window {
  dataLayer : any[];
}

declare var window : DataLayer;

const dataLayer = window.dataLayer = (window.dataLayer || []) as any[];

export function gtag(action : string, ...params : any[]) {
  dataLayer.push(arguments);
}

export default gtag;

declare var GA_TRACKING_ID : string;

gtag('js', new Date());
gtag('config', GA_TRACKING_ID);

window.addEventListener('load', sendPageviewOnLocationChange);

function sendPageviewOnLocationChange() {
  let page_path = location.pathname;

  global.setInterval(() => {
    if (page_path === location.pathname) {
      return;
    }

    page_path = location.pathname;
    gtag('config', GA_TRACKING_ID, { page_path });
  }, 300);
}

