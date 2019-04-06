import * as React from 'react';
export interface IngredientProps {
    title: string;
    quantity?: string;
}
export declare function Ingredient({ title, quantity }: IngredientProps): JSX.Element;
export interface MethodProps {
    children: React.ReactNode;
}
export declare function Method({ children }: MethodProps): JSX.Element;
export interface Props {
    title: string;
    photo: string;
    altText: string;
    time: string;
    level: string;
    mealFor: string;
    children: React.ReactElement<IngredientProps | MethodProps>[];
}
export declare function Recipe({ title, photo, altText, time, level, mealFor, children }: Props): JSX.Element;
export default Recipe;
