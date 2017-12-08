const dataLayer = (self as any).dataLayer = ((self as any).dataLayer || []) as any[];

export function gtag(action : string, ...params : any[]) {
  dataLayer.push(arguments);
}

export default gtag;

