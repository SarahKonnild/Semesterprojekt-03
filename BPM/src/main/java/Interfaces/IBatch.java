package Interfaces;

import Domain.BeerType;

import java.util.Date;

public interface IBatch {

    public int getBatchId();

    public void setBatchId(int batchId);

    public Date getTimestamp();

    public void setTimestamp(Date timestamp);

    public BeerType getBeerType();

    public void setBeerType(BeerType beerType);

    public int getBatchSize();

    public void setBatchSize(int batchSize);

    public int getDefectiveBeers();

    public void setDefectiveBeers(int defectiveBeers);

    public double getProductionSpeed();

    public void setProductionSpeed(double productionSpeed);

    public double getTemperature();

    public void setTemperature(double temperature);
    public double getHumidity();

    public void setHumidity(double humidity);

    public double getVibration();

    public void setVibration(double vibration);

}
