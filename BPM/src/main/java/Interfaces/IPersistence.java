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

    public boolean createBatch(Batch batch);

    public boolean createProduction(Production production);

    public boolean deleteBatch(int batchId);

    public boolean deleteProduction(int productionId);

}
