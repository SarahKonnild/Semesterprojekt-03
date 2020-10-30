package Domain;

import Interfaces.IBatch;

import java.util.Date;

public class Batch implements IBatch {

    private int batchId;
    private Date timestamp;
    private BeerType beerType;
    private int batchSize;
    private int defectiveBeers;
    private double productionSpeed;
    private double temperature;
    private double humidity;
    private double vibration;

    public Batch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed){
        this.batchId = batchId;
        this.timestamp = timestamp;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.productionSpeed = productionSpeed;
    }

    public Batch(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed, int defectiveBeers,
        double temperature, double humidity, double vibration){
        this.batchId = batchId;
        this.timestamp = timestamp;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.defectiveBeers = defectiveBeers;
        this.productionSpeed = productionSpeed;
        this.temperature = temperature;
        this.humidity = humidity;
        this.vibration = vibration;
    }

    @Override
    public int getBatchId() {
        return batchId;
    }

    @Override
    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }

    @Override
    public Date getTimestamp() {
        return timestamp;
    }

    @Override
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public BeerType getBeerType() {
        return beerType;
    }

    @Override
    public void setBeerType(BeerType beerType) {
        this.beerType = beerType;
    }

    @Override
    public int getBatchSize() {
        return batchSize;
    }

    @Override
    public void setBatchSize(int batchSize) {
        this.batchSize = batchSize;
    }

    @Override
    public int getDefectiveBeers() {
        return defectiveBeers;
    }

    @Override
    public void setDefectiveBeers(int defectiveBeers) {
        this.defectiveBeers = defectiveBeers;
    }

    @Override
    public double getProductionSpeed() {
        return productionSpeed;
    }

    @Override
    public void setProductionSpeed(double productionSpeed) {
        this.productionSpeed = productionSpeed;
    }

    @Override
    public double getTemperature() {
        return temperature;
    }

    @Override
    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    @Override
    public double getHumidity() {
        return humidity;
    }

    @Override
    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    @Override
    public double getVibration() {
        return vibration;
    }

    @Override
    public void setVibration(double vibration) {
        this.vibration = vibration;
    }

}
