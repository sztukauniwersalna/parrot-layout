import * as React from 'react';
import { render } from 'react-dom';

import { Page, Layout, Website } from 'paramorph/models';

import ParrotLayout from '../src/ParrotLayout';

const body = () => (
  <div>
    <h1>Parrot Layout</h1>
    <p>
      Lorem ipsum dolor sit amet.
    </p>
  </div>
);

const website = new Website();

const layout = new Layout('parrot', ParrotLayout);
website.addLayout(layout);

const page = new Page(
  'Parrot',
  'Layout',
  '/',
  layout,
  body,
  true,
  new Date(),
  [],
  [],
  true,
);
website.addPage(page);

window.addEventListener('load', () => {
  render(
    <ParrotLayout website={ website } page={ page } />,
    document.getElementById("root"),
  );
});

