package Domain;

import Interfaces.IIngredient;

public class Ingredient implements IIngredient {

    private int ingredientId;
    private IngredientType ingredientName;
    private double stock;

    public Ingredient(int ingredientId, IngredientType ingredientName, double stock){
        this.ingredientId = ingredientId;
        this.ingredientName = ingredientName;
        this.stock = stock;
    }

    @Override
    public int getIngredientId() {
        return ingredientId;
    }

    @Override
    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Override
    public IngredientType getIngredientName() {
        return ingredientName;
    }

    @Override
    public void setIngredientName(IngredientType ingredientName) {
        this.ingredientName = ingredientName;
    }

    @Override
    public double getStock() {
        return stock;
    }

    @Override
    public void setStock(double stock) {
        this.stock = stock;
    }


    @Override
    public String toString() {
        return "Ingredient{" +
                "ingredientId=" + ingredientId +
                ", ingredientName=" + ingredientName +
                ", stock=" + stock +
                '}';
    }
}
