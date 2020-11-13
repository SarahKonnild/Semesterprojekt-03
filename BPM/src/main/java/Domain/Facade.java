package Domain;

import Interfaces.IFacade;
import Interfaces.IPersistence;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Date;

public class Facade implements IFacade {

    public static final int port = 8000;
    private static Facade facade = new Facade();

    private Facade() {

    }

    // NOTE FROM CHMAD. save production and batch should be last, so that endTime on Batch can be initialized properly
    /**
     * OPC UA Functions
     */
    //region
    @Override
    public boolean startProduction(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed, int productionId) {
        //TODO adapt to take in a JSON object/document that can then be separated into the relevant data that is written above
        System.out.println("YOLO BITCHES ITS FRIDAY");
//        Batch batch = new Batch(batchId, timestamp, beerType, batchSize, productionSpeed, productionId);
//        ArrayList<Batch> batchQueue = new ArrayList<>();
//        batchQueue.add(batch);
//        Production production = new Production((int) Math.random(), batchQueue);

        //TODO insert code which saves the production and batch to the database
//        persistence.createProduction(production);
//        persistence.createBatch(batchQueue.get(0));

        //TODO insert code which sends the production(batch) to the machine
        //TODO insert code which creates a thread that listens to the machine, seeing if the production is finished. If finished run stopProduction()
        //TODO insert code which runs the detectMaintenanceStatus()
        return false;
    }

    @Override
    public Production stopProduction(Production production) {
        //IF RUNNING:
        //TODO insert code which sends the stop production signal via OPC UA to the machine
        //OUTSIDE IF
        //TODO insert code which sets the new values to fit the second constructor for batch. Do note that it is a VERY good idea to save the values for
        // humidity, temperature and vibration in an ArrayList here, and then calculate their average and plop them into the constructor
        //TODO insert code which returns the production with the updated batch to the GUI/forward to database?
        return null;
    }

    @Override
    public int detectMaintenanceStatus() {
        //TODO insert code which on a thread is subscribed to the maintenance status of the machine
        //TODO insert code which checks if the maintenance status is above a certain value/critical point, to send a warning
        return 0;
    }
    //endregion

    /**
     * Optimization calculations
     */
    //region
    @Override
    public double calculateErrorSpeed(BeerType beerType, double speed) {
        //TODO insert formula for optimization calculation
        return 0;
    }

    @Override
    public double calculateErrorMargin(BeerType beerType, int batchSize) {
        //TODO insert formula for optimization calculation
        return 0;
    }

    @Override
    public double calculateOptimalSpeed(BeerType beerType, double errorMargin) {
        //TODO insert formula for optimization calculation
        return 0;
    }
    //endregion

    public static Facade getFacade() {
//        if(facade == null) {
//            facade = new Facade();
//        }
        return facade;
    }
}
