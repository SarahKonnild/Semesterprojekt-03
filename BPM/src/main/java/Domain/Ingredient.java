package Domain;

public class Ingredient {

    private int ingredientId;
    private IngredientType ingredientName;
    private double stock;

    public Ingredient(int ingredientId, IngredientType ingredientName, double stock){
        this.ingredientId = ingredientId;
        this.ingredientName = ingredientName;
        this.stock = stock;
    }

}
