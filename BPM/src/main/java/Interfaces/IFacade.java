package Interfaces;

import Domain.*;

import java.util.ArrayList;
import java.util.Date;

public interface IFacade {

    public boolean startProduction(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed);

    public boolean stopProduction(Production production);

    public int detectMaintenanceStatus();

    public boolean saveProductionToDatabase(Production production);

    public Production fetchProductionFromDatabase(int productionId);

    public Batch fetchBatchFromDatabase(int batchId);

    public ArrayList<Batch> fetchBatchesFromDatabase();

//    public Production createProduction();

    public double calculateErrorMargin(BeerType beerType, double speed);

    public double calculateErrorMargin(BeerType beerType, int batchSize);

    public double calculateOptimalSpeed(BeerType beerType, double errorMargin);

}
