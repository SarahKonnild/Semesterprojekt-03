package Interfaces;

import Domain.IngredientType;

public interface IIngredient {

    public int getIngredientId();

    public void setIngredientId(int ingredientId);

    public IngredientType getIngredientName();

    public void setIngredientName(IngredientType ingredientName);

    public double getStock();

    public void setStock(double stock);
}
