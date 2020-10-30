package Domain;

import java.util.ArrayList;

public class Facade {

    private boolean startProduction(Production production, double speed){
        //TODO insert code which calls the createProduction() function below, and sends the production(batch) to the machine
        return false;
    }

    private boolean createProduction(int productionId, ArrayList<Batch> batchQueue){
        //TODO insert code which sends the creates a production
        return false;
    }

    private boolean stopProduction(Production production){
        //TODO insert code which sends the stop production signal via OPC UA to the machine
        return false;
    }

    private int detectMaintenanceStatus(){
        //TODO insert code which on a thread is subscribed to the maintenance status of the machine
        //TODO insert code which checks if the maintenance status is above a certain value/critical point, to send a warning
        return 0;
    }

    private boolean saveProductionToDatabase(Production production){
        //TODO insert code which sends the production to the persistence as a JSON object (reform the domain object to JSON object)
        return false;
    }

    private Production fetchProductionFromDatabase(int productionId){
        //TODO insert code which retrieves the production from the persistence as a JSON object (reform the JSON object to domain object)
        return null;
    }

    private Batch fetchBatchFromDatabase(int batchId){
        //TODO insert code which retrieves a batch from database with the specified ID
        return null;
    }

    private ArrayList<Batch> fetchBatchesFromDatabase(){
        //TODO insert code which retrieves all batches from the database
        return null;
    }

    private double calculateErrorMargin(BeerType beerType, double speed){
        //TODO insert formula for optimization calculation
        return 0;
    }

    private double calculateErrorMargin(BeerType beerType, int batchSize){
        //TODO insert formula for optimization calculation
        return 0;
    }

    private double calculateOptimalSpeed(BeerType beerType, double errorMargin){
        //TODO insert formula for optimization calculation
        return 0;
    }
}
