package Domain;

import Interfaces.IProduction;

import java.util.ArrayList;
import java.util.Date;

public class Production implements IProduction {

    private int productionId;
    private ArrayList<Batch> batchQueue;

    public Production(int productionId, ArrayList<Batch> batchQueue){
        this.productionId = productionId;
        this.batchQueue = batchQueue;
    }

    @Override
    public Batch createBatch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed){
        Batch batch = new Batch(batchId, timestamp, beerType, batchSize, productionSpeed);
        return batch;
    }

    @Override
    public Batch completeBatch(Batch batch, int defectiveBeers, double temperature, double humidity, double vibration){
        Batch finishedBatch = new Batch(batch.getBatchId(), batch.getTimestamp(), batch.getBeerType(), batch.getBatchSize(), batch.getProductionSpeed(), defectiveBeers, temperature, humidity, vibration);
        return finishedBatch;
    }

    @Override
    public int getProductionId() {
        return productionId;
    }

    @Override
    public void setProductionId(int productionId) {
        this.productionId = productionId;
    }

    @Override
    public ArrayList<Batch> getBatchQueue() {
        return batchQueue;
    }

    @Override
    public void setBatchQueue(ArrayList<Batch> batchQueue) {
        this.batchQueue = batchQueue;
    }
}
