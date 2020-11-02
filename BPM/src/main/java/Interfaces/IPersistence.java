package Interfaces;

import Domain.Batch;
import Domain.Ingredient;
import Domain.Production;

import java.util.ArrayList;

public interface IPersistence {
    public Batch getBatch(int batchId);

    public Production getProduction(int productionId);

    public ArrayList<Batch> getBatches();

    public ArrayList<Production> getProductions();

    public ArrayList<Ingredient> getIngredients();

    public void createBatch(Batch batch);

    public void createProduction(Production production);

    public void deleteBatch(int batchId);

    public void deleteProduction(int productionId);
}
