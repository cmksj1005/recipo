export type RecipeIngredients = {
  name: string;
  quantity: number | null;
  unit: string;
};

export type RecipeResult = {
  title: string;
  ingredients: RecipeIngredients[];
  instruction: string[];
  embedUrl: string;
};
