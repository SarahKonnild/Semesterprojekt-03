package Domain;

import Interfaces.IProduction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Production implements IProduction {

    private int productionId;
    private Batch batch;
    private ArrayList<Batch> batchQueue;

    public Production(){

    }

    public Production(int productionId, Batch batch){
        this.productionId = productionId;
        this.batch = batch;
    }

    //    @Override
//    public Batch createBatch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed){
//        Batch batch = new Batch(batchId, timestamp, beerType, batchSize, productionSpeed);
//        return batch;
//    }
//
//    @Override
//    public Batch completeBatch(Batch batch, int defectiveBeers, double temperature, double humidity, double vibration){
//        Batch finishedBatch = new Batch(batch.getBatchId(), batch.getTimestamp(), batch.getBeerType(), batch.getBatchSize(), batch.getProductionSpeed(), defectiveBeers, temperature, humidity, vibration);
//        return finishedBatch;
//    }

    @Override
    public int getProductionId() {
        return productionId;
    }

    @Override
    public void setProductionId(int productionId) {
        this.productionId = productionId;
    }

    @Override
    public Batch getBatch() {
        return batch;
    }

    @Override
    public void setBatch(Batch batch) {
        this.batch = batch;
    }

    @Override
    public String toString() {
        return "Production{\n" +
                "productionId=" + productionId +
                ",\nbatchQueue=\n" + batchQueue +
                "\n}";
    }
}
