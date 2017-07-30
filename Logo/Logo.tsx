import * as React from 'react';
import { ReactElement } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const s = require('./Logo.scss');

export type Variant = 'small' | 'inline' | 'full';

export interface Props {
  variant?: Variant;
}

export function Logo({ variant = 'inline' } : Props) {
  return (
    <svg
      className={ `${s.logo} ${s[variant]}` }
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ `0 0 ${getDimensions(variant).join(' ')}` }
      version="1.1"
    >
      <g>
        { renderLogo(variant) }
      </g>
    </svg>
  );
}

function renderLogo(variant : Variant) {
  switch (variant) {
    case 'small': return renderSmallLogo();
    case 'inline': return renderInlineLogo();
    case 'full': return renderFullLogo();
  }
}

function renderSmallLogo() : ReactElement<any>[] {
  return [(
    <path
      className={ s.letterU }
      key='letterU'
      d="M521.3,0V118.14q0,46.93-21.67,72t-60.87,25.12h-7.18q-39.48,0-60.87-25t-21.39-72.18V0h37.54V118.14q0,17.12,2.48,28.43t7.87,18.36a28.82,28.82,0,0,0,13.8,9.94q8.41,2.9,20.56,2.9h7.18a61.25,61.25,0,0,0,20.43-3,30.88,30.88,0,0,0,14.08-9.94q5.52-6.89,8-18.36t2.48-28.29V0Z" />
  ), (
    <rect
      className={ s.letterU }
      key='letterU2'
      x="520.55"
      width="97.74"
      height="37.58" />
  ), (
    <path
      className={ s.letterS }
      key='letterS'
      d="M3.59,215.31V177.77H78.94q17.39,0,28.71-8.28T119,148a24.8,24.8,0,0,0-3-12.14,30.35,30.35,0,0,0-8.28-9.52A39,39,0,0,0,95,120.08a56.18,56.18,0,0,0-16-2.21H61.83a68.86,68.86,0,0,1-24.57-4.28,57.66,57.66,0,0,1-19.6-12.15,56.88,56.88,0,0,1-13-18.49A57.74,57.74,0,0,1,0,59.35,56.59,56.59,0,0,1,4.83,35.89,56,56,0,0,1,18.49,17.11,64.11,64.11,0,0,1,39.75,4.56,78.78,78.78,0,0,1,67.08,0L386.87,0V37.56l-321.73,0q-11.87,0-18.77,6.49a20.65,20.65,0,0,0-6.9,15.6,21.8,21.8,0,0,0,7,16.56q7,6.62,18.63,6.62H86.4a71.15,71.15,0,0,1,26.5,4.83,61.4,61.4,0,0,1,21,13.66,63.13,63.13,0,0,1,13.8,21,69.31,69.31,0,0,1,5,26.5,66.87,66.87,0,0,1-5.25,26.78,59.83,59.83,0,0,1-15,21A70.9,70.9,0,0,1,109,210.34a86.77,86.77,0,0,1-30.09,5ZM65.14,37.54,67.08,0" />
  ), (
    <circle
      className={ s.dot }
      key='dot'
      cx="618.29"
      cy="171.76"
      r="43.54" />
  )];
}

function renderInlineLogo() : ReactElement<any>[] {
  return [(
    <path
      className={ s.lettersZTUK }
      key='lettersZTUK'
      d="M389.84,47.45,421.43.81h-22L354.19,72.26V.81h-48V19.27h0V58.84A67,67,0,0,1,305,72.73a21.55,21.55,0,0,1-3.93,9,15.16,15.16,0,0,1-6.91,4.88,30.08,30.08,0,0,1-10,1.49h-3.52a31.24,31.24,0,0,1-10.1-1.42,14.15,14.15,0,0,1-6.78-4.88,22.68,22.68,0,0,1-3.86-9,66.65,66.65,0,0,1-1.22-14V.81H161.55l0,18.38h27V88.12H107.86l44.33-69.27A14.26,14.26,0,0,0,154.77,11a8.6,8.6,0,0,0-4-7.39q-4-2.78-10.51-2.78H84V19.23H129.3L85.09,88.52q-3.53,5.56-3.52,9.35,0,8.68,14.1,8.68H207V19.25h33.21V58.84q0,23.18,10.51,35.45t29.89,12.27h3.52q19.25,0,29.89-12.34t10.64-35.38V19.27h11.11V98.15a9.63,9.63,0,0,0,2.17,6.64,7.25,7.25,0,0,0,5.69,2.44,15.27,15.27,0,0,0,5.9-1.15,10,10,0,0,0,4.68-4.27l24.67-38L408,106.55H433Z" />
  ), (
    <path
      className={ s.letterA }
      key='letterA'
      d="M495.44,5.56a11.09,11.09,0,0,1,4.68-4.27A13.86,13.86,0,0,1,506,0a7,7,0,0,1,5.63,2.51,10.12,10.12,0,0,1,2.1,6.71v97.34h-18.3V35.11l-45.28,71.44h-22Z" />
  ), (
    <path
      className={ s.letterN }
      key='letterN'
      d="M674.56.55l52.06,73.6V.81h17.62V97.47q0,10.17-6.91,10.17a11.3,11.3,0,0,1-6-1.56,29.17,29.17,0,0,1-5.69-4.81L673.88,33.21v73.34H656.12V.55Z" />
  ), (
    <path
      className={ s.letterI }
      key='letterI'
      d="M756,106.55V.81h18.44V106.55Z" />
  ), (
    <path
      className={ s.lettersWE }
      key='lettersWE'
      d="M954.2,88.12v-26h28.6V43.79H954.2V19.25h33.22V.81H905.66V72.26L864.46,7.18a12.58,12.58,0,0,0-5-5.08A12.86,12.86,0,0,0,853.88.81a12.18,12.18,0,0,0-4.61.88,11.4,11.4,0,0,0-3.8,2.51,12,12,0,0,0-2.57,3.86,12.15,12.15,0,0,0-.95,4.81V72.26L796.67.81h-22l67.24,101a10.57,10.57,0,0,0,4.67,4.2,14.52,14.52,0,0,0,5.9,1.22,7.24,7.24,0,0,0,5.69-2.44,9.63,9.63,0,0,0,2.17-6.64V33.76l45.28,68.05a10.62,10.62,0,0,0,4.68,4.2,14.48,14.48,0,0,0,5.9,1.22,7.25,7.25,0,0,0,5.69-2.44,9.66,9.66,0,0,0,2.17-6.64V19.27h11.65v87.29h63.49V88.12Z" />
  ), (
    <path
      className={ s.lettersRS }
      key='letterR'
      d="M1157.41,60.87a31,31,0,0,0-6.78-10.3,30.19,30.19,0,0,0-10.3-6.71,34.94,34.94,0,0,0-13-2.37h-10.44a12.8,12.8,0,0,1-9.15-3.25,10.71,10.71,0,0,1-3.46-8.13,10.14,10.14,0,0,1,3.39-7.66q3.39-3.18,9.22-3.19h36.06V.81h-35.11a38.7,38.7,0,0,0-13.42,2.24A31.5,31.5,0,0,0,1094,9.22a27.51,27.51,0,0,0-6.71,9.22A27.84,27.84,0,0,0,1084.88,30a28.38,28.38,0,0,0,2.3,11.59,28,28,0,0,0,6.37,9.08,28.35,28.35,0,0,0,9.63,6,33.79,33.79,0,0,0,12.06,2.1h8.41a27.58,27.58,0,0,1,7.86,1.08,19.19,19.19,0,0,1,6.24,3.05,14.93,14.93,0,0,1,4.07,4.68,12.2,12.2,0,0,1,1.49,6,12.54,12.54,0,0,1-5.56,10.57q-5.56,4.07-14.1,4.07h-65.34l-15.05-16a43.59,43.59,0,0,0,15.59-5.22,35.73,35.73,0,0,0,10-8.61,31.19,31.19,0,0,0,5.42-10.44A38.46,38.46,0,0,0,1075.93,37a37,37,0,0,0-3.12-15.59,32.35,32.35,0,0,0-8.47-11.32,37,37,0,0,0-12.68-6.91A50.31,50.31,0,0,0,1036.08.81H996.9V106.55h18.44V19.25h20.34q10.17,0,15.66,4.54t5.49,13.62q0,9.76-7.12,14.57t-21.89,5.9q-11,.81-11,9.49a9.36,9.36,0,0,0,1.29,4.61,25,25,0,0,0,3.73,4.88l28.06,29.69h73.75a42.61,42.61,0,0,0,14.78-2.44,34.82,34.82,0,0,0,11.45-6.78,29.4,29.4,0,0,0,7.39-10.3,32.84,32.84,0,0,0,2.58-13.15A34.1,34.1,0,0,0,1157.41,60.87Z" />
  ), (
    <path
      className={ s.letterSecondA }
      key='letterSecondA'
      d="M1217.75,5.56a11.11,11.11,0,0,1,4.68-4.27,13.86,13.86,0,0,1,5.9-1.29,7,7,0,0,1,5.63,2.51,10.13,10.13,0,0,1,2.1,6.71v97.34h-18.3V35.11l-45.28,71.44h-22Z" />
  ), (
    <path
      className={ s.lettersLN }
      key='lettersLN'
      d="M1371.88.81V74.15L1320.23,6.23A14.54,14.54,0,0,0,1315.42,2a11.48,11.48,0,0,0-5.08-1.15,8.57,8.57,0,0,0-6.64,2.51,9.52,9.52,0,0,0-2.3,6.71V88.12h-36.19V.81h-18.3V106.55h72.26V33.21l51.79,68.05a29.26,29.26,0,0,0,5.69,4.81,11.31,11.31,0,0,0,6,1.56q6.91,0,6.91-10.17V.81Z" />
  ), (
    <path className={ s.letterThirdA }
      d="M1457.93,5.56a11.11,11.11,0,0,1,4.68-4.27,13.86,13.86,0,0,1,5.9-1.29,7,7,0,0,1,5.63,2.51,10.13,10.13,0,0,1,2.1,6.71v97.34h-18.3V35.11l-45.28,71.44h-22Z" />
  ), (
    <path
      className={ s.letterS }
      key='letterSecondS'
      d="M1.76,106.53V88.09h37q8.54,0,14.1-4.07a12.54,12.54,0,0,0,5.56-10.57,12.18,12.18,0,0,0-1.49-6,14.91,14.91,0,0,0-4.07-4.68,19.16,19.16,0,0,0-6.23-3.05,27.59,27.59,0,0,0-7.86-1.08h-8.4a33.82,33.82,0,0,1-12.07-2.1,28.32,28.32,0,0,1-9.62-6A27.94,27.94,0,0,1,2.3,41.52,28.36,28.36,0,0,1,0,29.93,27.79,27.79,0,0,1,2.37,18.41,27.51,27.51,0,0,1,9.08,9.19,31.49,31.49,0,0,1,19.52,3,38.69,38.69,0,0,1,32.94.78h155.6V19.23H32q-5.83,0-9.22,3.19a10.14,10.14,0,0,0-3.39,7.66,10.7,10.7,0,0,0,3.46,8.13A12.81,12.81,0,0,0,32,41.45H42.43a34.94,34.94,0,0,1,13,2.37,30.15,30.15,0,0,1,10.3,6.71,31,31,0,0,1,6.78,10.3,34,34,0,0,1,2.44,13A32.84,32.84,0,0,1,72.39,87,29.38,29.38,0,0,1,65,97.31a34.82,34.82,0,0,1-11.45,6.78,42.61,42.61,0,0,1-14.78,2.44ZM32,19.22,32.94.78" />
  ), (
    <path
      className={ s.letterU }
      key='letterU'
      d="M687.43.29H621.36v58a67,67,0,0,1-1.22,13.9,21.55,21.55,0,0,1-3.93,9,15.16,15.16,0,0,1-6.91,4.88,30.08,30.08,0,0,1-10,1.49h-3.52a31.24,31.24,0,0,1-10.1-1.42,14.15,14.15,0,0,1-6.78-4.88,22.68,22.68,0,0,1-3.86-9,66.65,66.65,0,0,1-1.22-14V.29H555.34v58q0,23.18,10.51,35.45T595.74,106h3.52q19.25,0,29.89-12.34T639.8,58.31V18.74h47.63Z" />
  ), (
    <circle
      className={ s.dot }
      key='dot'
      cx="1513.22"
      cy="85.02"
      r="21.39" />
  )];
}

function renderFullLogo() : ReactElement<any>[] {
  return renderInlineLogo().concat([(
    <path
      className={ s.signed }
      key='signed-b'
      d="M1251.23,174.79a7.92,7.92,0,0,1,1.72,5.83,17.82,17.82,0,0,1-2.44,7.73,35.81,35.81,0,0,1-2.76,4.7,41.73,41.73,0,0,1-3.66,4.61,42.21,42.21,0,0,1-7,6.1q-3.85,2.67-7.82,5.2a3.09,3.09,0,0,1-2.62.54,3.37,3.37,0,0,1-2-1.54,3.46,3.46,0,0,1-.36-2.48,3.15,3.15,0,0,1,1.36-2.12q4.25-2.72,7.68-5.11a31.09,31.09,0,0,0,6-5.38,35.23,35.23,0,0,0,3-3.89,23.08,23.08,0,0,0,2.12-3.8,14.43,14.43,0,0,0,1.08-2.94,2.64,2.64,0,0,0-.45-2.22,2.28,2.28,0,0,0-1.36-.86,8.06,8.06,0,0,0-2.62,0,28.47,28.47,0,0,0-5.61,1.36,32.9,32.9,0,0,0-6.33,2.89,19.63,19.63,0,0,0-3,2.17,8.6,8.6,0,0,0-2.17,2.8c-.12.3-.23.59-.32.86l-.31,1a13.68,13.68,0,0,0-.14,2.48q0,1.22.14,2.31a3.47,3.47,0,0,1-1,2.49,3.51,3.51,0,0,1-2.12.95,3.1,3.1,0,0,1-2.22-.72,4.14,4.14,0,0,1-1.4-2.53,38.11,38.11,0,0,1-.68-6.19q-.13-3.57,0-7.6t.5-8.32q.36-4.29.86-8.27t1-7.46q.54-3.48,1.08-6c.18-1,.38-1.82.59-2.58a6.59,6.59,0,0,1,1-2.12,3.67,3.67,0,0,1,3.53-1.63,3.37,3.37,0,0,1,2.26.77,2.33,2.33,0,0,1,.72,2.21,5.57,5.57,0,0,1-.63,2.12,9.65,9.65,0,0,0-.72,1.67q-.45,2.62-.95,5.92t-1,7.05q-.5,3.75-.86,7.73t-.54,7.87a12.54,12.54,0,0,1,2.35-2.12,21.46,21.46,0,0,1,2.89-1.76,51.43,51.43,0,0,1,6.06-2.49,35.38,35.38,0,0,1,7.05-1.67,13.85,13.85,0,0,1,6.1.23A8.88,8.88,0,0,1,1251.23,174.79Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-y'
      d="M1299,178.32q.18,2.08.18,5.42t-.27,7.46q-.26,4.11-.66,8.77t-1,9.45q-.62,4.79-1.32,9.49t-1.59,8.86a3.5,3.5,0,0,1-1.59,2.53,3.43,3.43,0,0,1-2.51.45,3.24,3.24,0,0,1-2.22-1.31,3.47,3.47,0,0,1-.41-3q1.09-4.25,1.9-9.49t1.36-10.67q.54-5.43.86-10.62t.41-9.36a1.69,1.69,0,0,0-.18-1.18,1.18,1.18,0,0,0-.77-.45,1.65,1.65,0,0,0-1,.18,3.86,3.86,0,0,0-1,.72q-1.45,1.36-3.62,3.26t-4.61,3.93q-2.44,2-4.93,3.93t-4.56,3.26a20.46,20.46,0,0,1-7.28,2.94,8,8,0,0,1-6.55-1.85,12.17,12.17,0,0,1-2.12-2.71,9.4,9.4,0,0,1-1.13-4.61A17.8,17.8,0,0,1,1255,189a31.41,31.41,0,0,1,1.76-4.84,41.52,41.52,0,0,1,2.31-4.34,26.34,26.34,0,0,1,2.21-3.17,3.57,3.57,0,0,1,2.35-1.45,4.26,4.26,0,0,1,2.35.27,3.24,3.24,0,0,1,1.81,2.12,3.61,3.61,0,0,1-1,3.12,20.08,20.08,0,0,0-1.72,2.53q-.91,1.54-1.72,3.16a20.9,20.9,0,0,0-1.31,3.26,10,10,0,0,0-.5,2.89,3,3,0,0,0,.36,1.58,5.09,5.09,0,0,0,.72.95,2.19,2.19,0,0,0,2.12.54,9.68,9.68,0,0,0,3.12-1.45q2.71-1.72,5.65-4t5.92-4.88q3-2.58,5.83-5.2t5.29-5a4.53,4.53,0,0,1,2.59-1.45,5.55,5.55,0,0,1,2.83.18,4.66,4.66,0,0,1,2,1.54A5.55,5.55,0,0,1,1299,178.32Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-o'
      d="M1406.82,183.38a12.56,12.56,0,0,1-3,8q-2.93,3.53-9.06,5.88-4,1.54-8.38,3t-8.38,3q-10,3.71-18.08,3.39T1347.32,202q-4.69-4.43-4.69-12.75a26.66,26.66,0,0,1,1.4-8,46.88,46.88,0,0,1,3.8-8.72,49.5,49.5,0,0,1,5.61-8,31,31,0,0,1,6.73-6,4.56,4.56,0,0,1,1.49-2.94,3.19,3.19,0,0,1,3.21-.41,5.82,5.82,0,0,1,2.35,1.67,2.22,2.22,0,0,1,.54,2.49,1.87,1.87,0,0,0,1.45.18,33.84,33.84,0,0,1,7.46-.09,26.1,26.1,0,0,1,9,2.8q3.71,1.81,7.42,4.07a76.4,76.4,0,0,1,6.87,4.7,19.37,19.37,0,0,1,5.11,5.79A13.4,13.4,0,0,1,1406.82,183.38Zm-6.87.18q0-3.17-4.6-7.32a43,43,0,0,0-5.73-4.11q-3.21-1.94-6.81-3.75a23.7,23.7,0,0,0-8.39-2.4,31.08,31.08,0,0,0-7.4.23,5.72,5.72,0,0,1-2.57,0,2.14,2.14,0,0,1-1.67-1.31,24.12,24.12,0,0,0-4.83,5,51,51,0,0,0-4.29,6.83,47.42,47.42,0,0,0-3,7,18.45,18.45,0,0,0-1.13,5.56,20.71,20.71,0,0,0,.9,4.88,7.89,7.89,0,0,0,2.26,3.62q2.62,2.44,8.08,2.4t15-3.21l8.21-2.76q4.42-1.49,8.21-3a19.1,19.1,0,0,0,6-3.66A5.59,5.59,0,0,0,1399.95,183.56Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-l'
      d="M1454.74,193.6a3.4,3.4,0,0,1,0,2.49,3.75,3.75,0,0,1-2.31,2l-6,2.08a71,71,0,0,1-7.73,2.17,47.6,47.6,0,0,1-8.23,1.08,17.72,17.72,0,0,1-7.5-1.17,13.31,13.31,0,0,1-7.78-8.23,42.9,42.9,0,0,1-2-14.65,44.63,44.63,0,0,1,.72-7.87,58.11,58.11,0,0,1,4.74-14.87,41.23,41.23,0,0,1,3.21-5.65,24.82,24.82,0,0,1,5.74-6.06,7.16,7.16,0,0,1,5.38-1.54q2.71.36,4.47,3.48t2.12,9.27a38.62,38.62,0,0,1,0,5.29,54.64,54.64,0,0,1-.68,5.74q-.5,2.89-1.27,5.65a37.85,37.85,0,0,1-1.76,5,38.78,38.78,0,0,1-2.49,4.84q-1.4,2.3-2.94,4.39T1427.3,191q-1.58,1.81-3,3.35a11.51,11.51,0,0,0,1.67,1.08,6.89,6.89,0,0,0,2.12.82,18.12,18.12,0,0,0,5,0,43.88,43.88,0,0,0,5.61-1q2.89-.72,5.88-1.67t5.69-1.95a3.47,3.47,0,0,1,2.8.09A3.31,3.31,0,0,1,1454.74,193.6Zm-22.06-36.07q-.27-5-1.8-5.34t-3.95,3.44a31.84,31.84,0,0,0-2.33,4.47q-1.17,2.67-2.2,5.88a51.8,51.8,0,0,0-1.66,6.69,44.92,44.92,0,0,0-.72,6.74,21.12,21.12,0,0,0,1.26,8.41q2.33-2.8,4.67-6a34.45,34.45,0,0,0,3.86-6.83,36.06,36.06,0,0,0,1.12-3.48,45.48,45.48,0,0,0,1-4.56q.4-2.44.63-4.88A33.28,33.28,0,0,0,1432.68,157.52Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-e'
      d="M1488.1,193.87a3.21,3.21,0,0,1,.23,2.53,2.92,2.92,0,0,1-2.12,1.9q-2.08.73-5.34,2t-7.14,2.48a52.93,52.93,0,0,1-8.23,1.76,27.66,27.66,0,0,1-8.5-.14,11.26,11.26,0,0,1-6.42-3q-4.16-4-2.8-11.3a28.71,28.71,0,0,1,1.76-6.42,41.19,41.19,0,0,1,2.67-5.42,39.8,39.8,0,0,1,2.94-4.34,35.77,35.77,0,0,1,2.76-3.16q1.27-1.27,2.53-2.31a10.86,10.86,0,0,1,2.26-1.49,15.73,15.73,0,0,1,2.4-.95,13.53,13.53,0,0,1,2.71-.54,12.15,12.15,0,0,1,2.76,0,6.38,6.38,0,0,1,2.53.9,5.73,5.73,0,0,1,2.08,2.08,8.67,8.67,0,0,1,1,2.75,12.19,12.19,0,0,1,.14,3.17,22.06,22.06,0,0,1-.5,3.21,14.26,14.26,0,0,1-3,5.56,25.37,25.37,0,0,1-5.2,4.56,32,32,0,0,1-6.42,3.3,24.45,24.45,0,0,1-6.6,1.58,4.78,4.78,0,0,0,.72,3.57,4.61,4.61,0,0,0,3,1.67,17.3,17.3,0,0,0,6.74.14,54.51,54.51,0,0,0,7.23-1.67q3.57-1.08,6.78-2.35t5.29-1.9a2.82,2.82,0,0,1,2.4.14A3.57,3.57,0,0,1,1488.1,193.87Zm-18.72-17.72q.63-2.8-.36-3.71a2.56,2.56,0,0,0-1.81-.27,6,6,0,0,0-1.9.63,16.61,16.61,0,0,0-2.8,2.35,27.55,27.55,0,0,0-3.66,4.66,23.47,23.47,0,0,0-2.67,5.65,20.14,20.14,0,0,0,4.16-1.27,23.66,23.66,0,0,0,4.07-2.17,16.24,16.24,0,0,0,3.21-2.76A8,8,0,0,0,1469.38,176.15Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-l2'
      d="M1524.72,193.6a3.4,3.4,0,0,1,0,2.49,3.75,3.75,0,0,1-2.31,2l-6,2.08a71,71,0,0,1-7.73,2.17,47.6,47.6,0,0,1-8.23,1.08,17.72,17.72,0,0,1-7.5-1.17,13.31,13.31,0,0,1-7.78-8.23,42.9,42.9,0,0,1-2-14.65,44.63,44.63,0,0,1,.72-7.87,58.11,58.11,0,0,1,4.74-14.87,41.23,41.23,0,0,1,3.21-5.65,24.82,24.82,0,0,1,5.74-6.06,7.16,7.16,0,0,1,5.38-1.54q2.71.36,4.47,3.48t2.12,9.27a38.62,38.62,0,0,1,0,5.29,54.64,54.64,0,0,1-.68,5.74q-.5,2.89-1.27,5.65a37.85,37.85,0,0,1-1.76,5,38.78,38.78,0,0,1-2.49,4.84q-1.4,2.3-2.94,4.39t-3.12,3.89q-1.58,1.81-3,3.35a11.51,11.51,0,0,0,1.67,1.08,6.89,6.89,0,0,0,2.12.82,18.12,18.12,0,0,0,5,0,43.88,43.88,0,0,0,5.61-1q2.89-.72,5.88-1.67t5.69-1.95a3.47,3.47,0,0,1,2.8.09A3.31,3.31,0,0,1,1524.72,193.6Zm-22.06-36.07q-.27-5-1.8-5.34t-3.95,3.44a31.84,31.84,0,0,0-2.33,4.47q-1.17,2.67-2.2,5.88a51.8,51.8,0,0,0-1.66,6.69,44.92,44.92,0,0,0-.72,6.74,21.12,21.12,0,0,0,1.26,8.41q2.33-2.8,4.67-6a34.45,34.45,0,0,0,3.86-6.83,36.06,36.06,0,0,0,1.12-3.48,45.48,45.48,0,0,0,1-4.56q.4-2.44.63-4.88A33.28,33.28,0,0,0,1502.65,157.52Z" />
  ), (
    <path
      className={ s.signed }
      key='signed-a'
      d="M1571.28,193.42a3.44,3.44,0,0,1,.68,2.71,3.38,3.38,0,0,1-1.67,2.44,46,46,0,0,1-7,3.12,32.12,32.12,0,0,1-7.28,1.76,14.19,14.19,0,0,1-6.1-.45,7.74,7.74,0,0,1-3.66-3.16,7.66,7.66,0,0,1-1.13-2.44,10,10,0,0,1-.5-2.89.89.89,0,0,0-.68-.86,1.61,1.61,0,0,0-1.31.41,26.75,26.75,0,0,0-2.4,1.76q-1.4,1.13-3,2.48t-3.21,2.8q-1.63,1.44-3.08,2.62a11.76,11.76,0,0,1-6.42,2.76,6.54,6.54,0,0,1-4.88-1.58q-2.35-2.08-2.35-6.24a17.82,17.82,0,0,1,.63-3.93,21,21,0,0,1,1.45-3.75,33.91,33.91,0,0,1,3.35-5.33,55.55,55.55,0,0,1,4.2-4.93,51.88,51.88,0,0,1,4.48-4.16q2.26-1.85,4.16-3.12,1.62-1.08,3.71-2.3a16.63,16.63,0,0,1,4.48-1.81,13.28,13.28,0,0,1,5-.23,10.57,10.57,0,0,1,5.24,2.53,3.19,3.19,0,0,1,1.27,2.17,3.84,3.84,0,0,1-.45,2.17,3.52,3.52,0,0,1-2.3,1.67,3.74,3.74,0,0,1-3-.5,5.66,5.66,0,0,0-4.57-1.22,15.44,15.44,0,0,0-5.83,2.67,37.73,37.73,0,0,0-3.66,2.85,47.32,47.32,0,0,0-3.93,3.84q-1.9,2.08-3.57,4.29a25.28,25.28,0,0,0-2.67,4.29,7.92,7.92,0,0,0-.72,2.62q-.18,1.54.54,2.08,1,.81,2.89-.82,1.36-1.17,3.39-2.89t4.21-3.48q2.17-1.76,4.29-3.39a45.15,45.15,0,0,1,3.75-2.62,9.39,9.39,0,0,1,2.76-1.13,5.41,5.41,0,0,1,2.49,0,2.9,2.9,0,0,1,1.72,1.17,4.2,4.2,0,0,1,.63,2.44,25.18,25.18,0,0,0,0,3.39,10.07,10.07,0,0,0,.59,2.76,3.66,3.66,0,0,0,1.49,2.08,4.43,4.43,0,0,0,2.49.45,27,27,0,0,0,2.71-.59q1.54-.41,3.07-.95t3-1.13q1.49-.59,2.58-1.13a3.14,3.14,0,0,1,4.07.72Z" />
  )]);
}

function getDimensions(variant : Variant) {
  switch (variant) {
    case 'small': return [ 661.83, 215.31 ];
    case 'inline': return [ 1572, 107.8 ];
    case 'full': return [ 1572, 230.83 ];
  }
}

export default withStyles(s)(Logo);

