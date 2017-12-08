const dataLayer = [] as any[];
(self as any).dataLayer = dataLayer;

export function gtag(action : string, ...params : any[]) {
  dataLayer.push(arguments);
}

export default gtag;

