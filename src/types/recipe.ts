export type RecipeIngredients = {
  name: string;
  quantity: string;
};

export type RecipeResult = {
  title: string;
  ingredients: RecipeIngredients[];
  instruction: string[];
  embedUrl: string;
};
