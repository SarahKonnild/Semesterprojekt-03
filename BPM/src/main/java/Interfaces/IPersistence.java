package Interfaces;

import Domain.Batch;
import Domain.Ingredient;
import Domain.Production;

import java.util.ArrayList;
import java.util.List;

public interface IPersistence {

    public ArrayList<Batch> getBatches();

    public List<Production> getProductions();

    public List<Ingredient> getIngredients();

    public void createBatch();

    public void createProduction();

    public void deleteBatch(int batchId);

    public void deleteProduction(int productionId);

    //
}
