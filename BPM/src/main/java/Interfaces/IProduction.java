package Interfaces;

import Domain.Batch;
import Domain.BeerType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface IProduction {

//    public Batch createBatch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed);
//
//    public Batch completeBatch(Batch batch, int defectiveBeers, double temperature, double humidity, double vibration);

    public int getProductionId();

    public void setProductionId(int productionId);

    public ArrayList<Batch> getBatchQueue();

    public void setBatchQueue(ArrayList<Batch> batchQueue);
}
