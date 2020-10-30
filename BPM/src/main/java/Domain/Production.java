package Domain;

import java.util.ArrayList;
import java.util.Date;

public class Production {

    private int productionId;
    private ArrayList<Batch> batchQueue;

    public Production(int productionId, ArrayList<Batch> batchQueue){
        this.productionId = productionId;
        this.batchQueue = batchQueue;
    }

    private Batch createBatch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed){
        Batch batch = new Batch(batchId, timestamp, beerType, batchSize, productionSpeed);
        return batch;
    }

    private Batch completeBatch(Batch batch, int defectiveBeers, double temperature, double humidity, double vibration){
        Batch finishedBatch = new Batch(batch.getBatchId(), batch.getTimestamp(), batch.getBeerType(), batch.getBatchSize(), batch.getProductionSpeed(), defectiveBeers, temperature, humidity, vibration);
        return finishedBatch;
    }

    public int getProductionId() {
        return productionId;
    }

    public void setProductionId(int productionId) {
        this.productionId = productionId;
    }

    public ArrayList<Batch> getBatchQueue() {
        return batchQueue;
    }

    public void setBatchQueue(ArrayList<Batch> batchQueue) {
        this.batchQueue = batchQueue;
    }
}
