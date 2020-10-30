package Domain;

import Interfaces.IBatch;

import java.util.Date;

public class Batch implements IBatch {

    private int batchId;
    private Date startTime;
    private Date endTime;
    private BeerType beerType;
    private int batchSize;
    private int defectiveBeers;
    private double productionSpeed;
    private double avgTemperature;
    private double avgHumidity;
    private double avgVibration;

    public Batch(int batchId, Date startTime, BeerType beerType, int batchSize, double productionSpeed){
        this.batchId = batchId;
        this.startTime = startTime;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.productionSpeed = productionSpeed;
    }

    public Batch(int batchId, Date startTime, Date endTime, BeerType beerType, int batchSize, float productionSpeed, int defectiveBeers,
        double avgTemperature, double avgHumidity, double avgVibration){
        this.batchId = batchId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.defectiveBeers = defectiveBeers;
        this.productionSpeed = productionSpeed;
        this.avgTemperature = avgTemperature;
        this.avgHumidity = avgHumidity;
        this.avgVibration = avgVibration;
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
    public Date getStartTime() {
        return startTime;
    }

    @Override
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
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
        return avgTemperature;
    }

    @Override
    public void setTemperature(double temperature) {
        this.avgTemperature = temperature;
    }

    @Override
    public double getHumidity() {
        return avgHumidity;
    }

    @Override
    public void setHumidity(double humidity) {
        this.avgHumidity = humidity;
    }

    @Override
    public double getVibration() {
        return avgVibration;
    }

    @Override
    public void setVibration(double vibration) {
        this.avgVibration = vibration;
    }

}
