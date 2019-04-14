
interface DataLayer extends Window {
  dataLayer : any[];
}

declare var window : DataLayer;

const dataLayer = window.dataLayer = (window.dataLayer || []) as any[];

export function gtag(action : string, ...params : any[]) {
  dataLayer.push(arguments);
}

export default gtag;

