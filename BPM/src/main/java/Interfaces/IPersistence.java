package Interfaces;

import Domain.Batch;
import Domain.Production;

import java.util.ArrayList;
import java.util.List;

public interface IPersistence {

    public ArrayList<Batch> getBatches();

    public List<Production> getProductions();

    public void getIngredients();

    public void createBatch();

    public void createProduction();

    public void deleteBatch();

    public void deleteProductions();
}
