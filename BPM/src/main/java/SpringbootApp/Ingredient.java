package SpringbootApp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;

@Entity
public class Ingredient{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private IngredientType ingredientType;
    private double stock;

    protected Ingredient(){

    }

    public Ingredient(int id, IngredientType ingredientType, double stock){
        this.id = id;
        this.ingredientType = ingredientType;
        this.stock = stock;
    }

//    @Override
//    public String toString(){
//
//    }


    public int getId() {
        return id;
    }

    public IngredientType getIngredientType() {
        return ingredientType;
    }

    public double getStock() {
        return stock;
    }
}
