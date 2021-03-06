
import * as React from 'react';

import Icon from '../Icon';
import Image from '../Image';

const s = require('./style');

export interface IngredientProps {
  title : string;
  quantity ?: string;
}

export function Ingredient({ title, quantity } : IngredientProps) {
  return (
    <li>
      { title }
      { quantity
        ? <span className={ s.quantity }>{ ` (${quantity})` }</span>
        : null }
    </li>
  );
}

export interface MethodProps {
  children : React.ReactNode;
}

export function Method({ children } : MethodProps) {
  return (
    <p>{ children }</p>
  );
}

export interface Props {
  title : string;
  photo : string;
  altText : string;
  time : string;
  level : string;
  mealFor : string;
  children : React.ReactElement<IngredientProps | MethodProps>[];
}

export function Recipe({ title, photo, altText, time, level, mealFor, children } : Props) {
  const childs = ([] as React.ReactElement<IngredientProps | MethodProps>[]).concat(children);

  const ingredients = childs.filter(c => c.type === Ingredient);
  const methods = childs.filter(c => c.type === Method);

  return (
    <div className={ `${s.recipe} contrast` }>
      <div className={ s.header }>
        <h2>{ title }</h2>
        <ul>
          <li key='1' title='posiłek dla'><Icon name='child_care' />{ mealFor }</li>
          <li key='2' title='poziom trudności'><Icon name='whatshot'/>{ level }</li>
          <li key='3' title='czas przygotowania'><Icon name='access_time' />{ time }</li>
        </ul>
      </div>

      <Image src={ photo } alt={ altText } />

      <div className={ s.details }>
        <div className={ s.ingredients }>
          <h3>Składniki</h3>
          <div className='compact'>
            <ol>
              { ingredients }
            </ol>
          </div>
        </div>

        <div className={ s.method }>
          <h3>Sposób Przygotowania</h3>
          { methods }
        </div>
      </div>
    </div>
  );
}

export default Recipe;

