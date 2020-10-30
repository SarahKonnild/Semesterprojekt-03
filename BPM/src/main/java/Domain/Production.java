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

    private boolean createBatch(int batchId, Date timestamp, BeerType beerType, int batchSize, int productionSpeed){
        return false;
    }

    private boolean completeBatch(Batch batch, int defectiveBeers, double temperature, double humidity, double vibration){
        return false;
    }

}
