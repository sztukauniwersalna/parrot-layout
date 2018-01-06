declare var window : DataLayer;
declare var global : GaTrackingId;

interface DataLayer extends Window {
  dataLayer : any[];
}
interface GaTrackingId extends NodeJS.Global {
  GA_TRACKING_ID : string;
}

const dataLayer = window.dataLayer = (window.dataLayer || []) as any[];

export function gtag(action : string, ...params : any[]) {
  dataLayer.push(arguments);
}

export default gtag;

gtag('js', new Date());
gtag('config', global.GA_TRACKING_ID);

window.addEventListener('load', sendPageviewOnLocationChange);

function sendPageviewOnLocationChange() {
  let page_path = location.pathname;

  global.setInterval(() => {
    if (page_path === location.pathname) {
      return;
    }

    page_path = location.pathname;
    gtag('config', global.GA_TRACKING_ID, { page_path });
  }, 300);
}

