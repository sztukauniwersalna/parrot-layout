
import * as React from 'react';

import { Recipe, Ingredient, Method } from 'parrot-layout';

export function RecipePost() {
  return (
    <div>
      <Recipe
        title='Geometryczna szarlotka'
        time='120 minut'
        level='łatwy'
        mealFor='15 osób'
        photo='https://assets2.ello.co/uploads/asset/attachment/6401877/ello-optimized-acbac144.jpg'
        altText='Zdjęcie przedstawia czerwony talerz na jasnym tle z perspektywy lotu ptaka. Na talerzu znajduje się ciasto z jabłkami.'
      >
        <Ingredient title='jabłka' quantity='10 średnich' />
        <Ingredient title='mąka pszenna' quantity='3 i 1/2 szklanki' />
        <Ingredient title='cukier puder' quantity='1/2 szklanki' />
        <Ingredient title='cukier brązowy' quantity='3 łyżki' />
        <Ingredient title='masło' quantity='1 kostka' />
        <Ingredient title='jaja' quantity='4' />
        <Ingredient title='proszek do pieczenia' quantity='2 łyżeczki' />
        <Method>
          Obieram wszystkie jabłka (u mnie odmiana 'ligol') i kroję w drobną kostkę. Wrzucam do
          garnka, zalewam odrobiną wody, kropię sokiem z cytryny, zasypuję brązowym cukrem i duszę
          do miękkości. W międzyczasie przygotowuję ciasto. Mieszam mąkę z proszkiem do pieczenia,
          cukrem pudrem i zimnym masłem (dokładnie tak, jak zagniata się kruche ciasto). Wbijam jaja
          i wyrabiam rękoma. Dzielę na dwie równe części i wsadzam na pół godziny do lodówki. Po tym
          czasie jedną z części rozwałkowuje i wykładam do blachy o średnicy 25 x 40 cm. Wykładam
          uduszone jabłka i przykrywam drugą częścią ciasta. Tak przygotowane ciasto lądujena ok.
          45 min. do nagrzanego do 180°C. Voilà - najlepiej smakuje na ciepło z lodami waniliowymi.
        </Method>
      </Recipe>
    </div>
  );
}

export default RecipePost;

