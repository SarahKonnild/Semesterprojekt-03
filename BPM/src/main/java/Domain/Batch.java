package Domain;

import java.util.Date;

public class Batch {

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


    public int getBatchId() {
        return batchId;
    }

    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public BeerType getBeerType() {
        return beerType;
    }

    public void setBeerType(BeerType beerType) {
        this.beerType = beerType;
    }

    public int getBatchSize() {
        return batchSize;
    }

    public void setBatchSize(int batchSize) {
        this.batchSize = batchSize;
    }

    public int getDefectiveBeers() {
        return defectiveBeers;
    }

    public void setDefectiveBeers(int defectiveBeers) {
        this.defectiveBeers = defectiveBeers;
    }

    public double getProductionSpeed() {
        return productionSpeed;
    }

    public void setProductionSpeed(double productionSpeed) {
        this.productionSpeed = productionSpeed;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getVibration() {
        return vibration;
    }

    public void setVibration(double vibration) {
        this.vibration = vibration;
    }

}
