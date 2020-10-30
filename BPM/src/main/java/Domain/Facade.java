package Domain;

import java.util.ArrayList;

public class Facade {

    private boolean startProduction(Production production, double speed){
        return false;
    }

    private boolean createProduction(int productionId, ArrayList<Batch> batchQueue){
        return false;
    }

    private boolean stopProduction(Production production){
        return false;
    }

    private int detectMaintenanceStatus(){
        return 0;
    }

    private boolean saveProductionToDatabase(Production production){
        return false;
    }

    private Production fetchProductionFromDatabase(int productionId){
        return null;
    }

    private Batch fetchBatchFromDatabase(int batchId){
        return null;
    }

    private ArrayList<Batch> fetchBatchesFromDatabase(){
        return null;
    }

    private double calculateErrorMargin(BeerType beerType, double speed){
        return 0;
    }

    private double calculateErrorMargin(BeerType beerType, int batchSize){
        return 0;
    }

    private double calculateOptimalSpeed(BeerType beerType, double errorMargin){
        return 0;
    }
}
