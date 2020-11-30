package Interfaces;

import Domain.*;

import java.util.ArrayList;
import java.util.Date;

public interface IFacade {

    /**
     * OPC UA Functions
     */
    public boolean startProduction(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed, int productionId);

    public Production stopProduction(Production production);

    public int detectMaintenanceStatus();

    public double calculateErrorSpeed(BeerType beerType, double speed);

    public double calculateErrorMargin(BeerType beerType, int batchSize);

    public double calculateOptimalSpeed(BeerType beerType, double errorMargin);
}

