package SpringbootApp;

import Domain.BeerType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Batch{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private Date startTime;
    private Date endTime;
    private BeerType beerType;
    private int batchSize;
    private int defectiveBeers;
    private double productionSpeed;
    private double avgTemperature;
    private double avgHumidity;
    private double avgVibration;

    protected Batch() {

    }

    public Batch(int id, Date startTime, BeerType beerType, int batchSize, double productionSpeed){
        this.id = id;
        this.startTime = startTime;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.productionSpeed = productionSpeed;
    }

    public Batch(int id, Date startTime, BeerType beerType, int batchSize, double productionSpeed, Date endTime, int defectiveBeers, double avgTemperature, double avgHumidity, double avgVibration){
        this.id = id;
        this.startTime = startTime;
        this.beerType = beerType;
        this.batchSize = batchSize;
        this.productionSpeed = productionSpeed;
        this.endTime = endTime;
        this.defectiveBeers = defectiveBeers;
        this.avgTemperature = avgTemperature;
        this.avgHumidity = avgHumidity;
        this.avgVibration = avgVibration;
    }

    public int getId() {
        return id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public BeerType getBeerType() {
        return beerType;
    }

    public int getBatchSize() {
        return batchSize;
    }

    public int getDefectiveBeers() {
        return defectiveBeers;
    }

    public double getProductionSpeed() {
        return productionSpeed;
    }

    public double getAvgTemperature() {
        return avgTemperature;
    }

    public double getAvgHumidity() {
        return avgHumidity;
    }

    public double getAvgVibration() {
        return avgVibration;
    }
}
