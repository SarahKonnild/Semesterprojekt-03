package Interfaces;

import Domain.Batch;

import java.util.List;

public interface IPersistence {

    public List<Batch> getBatches();

    public void getProductions();

    public void getIngredients();

    public void createBatch();

    public void createProduction();

    public void deleteBatch();

    public void deleteProductions();
}
