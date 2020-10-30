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

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public IngredientType getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(IngredientType ingredientName) {
        this.ingredientName = ingredientName;
    }

    public double getStock() {
        return stock;
    }

    public void setStock(double stock) {
        this.stock = stock;
    }

}
