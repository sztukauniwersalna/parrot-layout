
import * as React from 'react';

const elements = [(
  <h1>Parrot Layout</h1>
),(
  <h2>Parrot Layout</h2>
),(
  <h3>Parrot Layout</h3>
),(
  <h4>Parrot Layout</h4>
),(
  <h5>Parrot Layout</h5>
),(
  <h6>Parrot Layout</h6>
),(
  <p>Lorem ipsum dolor sit amet.</p>
),(
  React.createElement('olela-narrative', {}, 'Lorem ipsum dolor sit amet')
),(
  <a href='http://sztukauniwersalna.pl/'>Sztuka Uniwersalna</a>
),(
  <ul>
  <li>Point.</li>
  <li>Point.</li>
  <li>Point.</li>
  </ul>
),(
  <ol>
  <li>One.</li>
  <li>Two.</li>
  <li>Three.</li>
  </ol>
),(
  <dl>
  <dt>Sztuka</dt>
  <dd>Dorobek kulturowy cywilizacji, manifestujący się poprzez utwory, w tym dzieła artystyczne.</dd>
  <dt>Uniwersalna</dt>
  <dd>Obejmująca całość, dotycząca wszystkiego lub wszystkich.</dd>
  </dl>
),(
  <hr />
)];

export function TypographyPost() {
  return (
    <div>
      <table key='normal'>
        <thead>
          <tr>
            <td>Normal</td>
            <td>Compact</td>
            <td>Strong</td>
            <td>Compact + Strong</td>
          </tr>
        </thead>
        <tbody>
          {
            elements.map((elem, i) => (
              <tr key={ i }>
                <td key='0'>{ elem }</td>
                <td key='1' className='compact'>{ elem }</td>
                <td key='2' className='strong'>{ elem }</td>
                <td key='3' className='compact strong'>{ elem }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <table key='contrast' className='contrast' style={ { background: '#333' } }>
        <thead>
          <tr>
            <td>Normal</td>
            <td>Compact</td>
            <td>Strong</td>
            <td>Compact + Strong</td>
          </tr>
        </thead>
        <tbody>
          {
            elements.map((elem, i) => (
              <tr key={ i }>
                <td key='0'>{ elem }</td>
                <td key='1' className='compact'>{ elem }</td>
                <td key='2' className='strong'>{ elem }</td>
                <td key='3' className='compact strong'>{ elem }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default TypographyPost;

