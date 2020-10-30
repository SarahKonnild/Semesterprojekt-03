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
    }

    public Batch(int batchId, Date timestamp, BeerType beerType, int batchSize, int defectiveBeers, double productionSpeed,
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

}
