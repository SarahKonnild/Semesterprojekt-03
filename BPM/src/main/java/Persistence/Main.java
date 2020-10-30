package Persistence;

import java.util.List;

import Domain.Batch;
import Domain.Ingredient;
import Domain.Production;

public class Main {

    public static void main(String[] args) {
        Persistence persistence = new Persistence();

        //View Batch List

        //List<Batch> batchList = persistence.getBatches();
        //System.out.println(batchList.get(0).toString());
        //System.out.println(batchList.get(1).toString());

        //View Production List

        //List<Production> productionList = persistence.getProductions();
        //System.out.println(productions.get(0).toString());

        //Delete Batch with BatchId 1

        //persistence.deleteBatch();
        //List<Production> productionList = persistence.getProductions();
        //System.out.println(productionList.get(0).toString());

        //View Ingredient List

        //List<Ingredient> ingredients = persistence.getIngredients();
        //System.out.println(ingredients);

    }
}
