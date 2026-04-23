export type RecipeResult = {
  invalidUrl: boolean;
  nonCookingRelated: boolean;
  title: string;
  ingredients: RecipeIngredients[];
  instruction: string[];
  embedUrl: string;
};

export type RecipeIngredients = {
  name: string;
  quantity: number | null;
  unit: string;
};
