package Domain;

import Interfaces.IFacade;
import Interfaces.IPersistence;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Date;

public class Facade implements IFacade {

    IPersistence persistence;
    public static final int port = 8000;

    private Facade(IPersistence persistence) {
        this.persistence = persistence;
        listen();
    }


    // NOTE FROM CHMAD. save production and batch should be last, so that endTime on Batch can be initialized properly
    /**
     * Socket related things
     */
    //region
    private ServerSocket serverSocket;
    //Sauce: https://gist.github.com/mpj/a979ded460dd52eb536a
    public void listen(){
        try{
            serverSocket = new ServerSocket(8000);
        }catch(IOException e){
            e.printStackTrace();
        }
        while(true){
            try{
                final Socket socket = serverSocket.accept();
                final InputStream inputStream = socket.getInputStream();
                final InputStreamReader streamReader = new InputStreamReader(inputStream);
                BufferedReader br = new BufferedReader(streamReader);

            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }
    //endregion


    /**
     * OPC UA Functions
     */
    //region
    @Override
    public boolean startProduction(int batchId, Date timestamp, BeerType beerType, int batchSize, double productionSpeed) {
        //TODO adapt to take in a JSON object/document that can then be separated into the relevant data that is written above
        Batch batch = new Batch(batchId, timestamp, beerType, batchSize, productionSpeed);
        ArrayList<Batch> batchQueue = new ArrayList<>();
        batchQueue.add(batch);
        Production production = new Production((int) Math.random(), batchQueue);
        //TODO insert code which saves the production and batch to the database
        //TODO insert code which sends the production(batch) to the machine
        //TODO insert code which creates a thread that listens to the machine, seeing if the production is finished. If finished run stopProduction()
        //TODO insert code which runs the detectMaintenanceStatus()
        return false;
    }

    @Override
    public boolean stopProduction(Production production) {
        //IF RUNNING:
        //TODO insert code which sends the stop production signal via OPC UA to the machine
        //OUTSIDE IF
        //TODO insert code which sets the new values to fit the second constructor for batch. Do note that it is a VERY good idea to save the values for
        // humidity, temperature and vibration in an ArrayList here, and then calculate their average and plop them into the constructor
        //TODO insert code which saves the production and batch to the database
        return false;
    }

    @Override
    public int detectMaintenanceStatus() {
        //TODO insert code which on a thread is subscribed to the maintenance status of the machine
        //TODO insert code which checks if the maintenance status is above a certain value/critical point, to send a warning
        return 0;
    }
    //endregion

    /**
     * Database communication
     */
    //region
    @Override
    public boolean saveProductionToDatabase(Production production) {
        //TODO insert code which invokes the similar method in persistence
        return false;
    }

    @Override
    public Production fetchProductionFromDatabase(int productionId) {
        persistence.getProduction(productionId);
        //TODO insert code which invokes the similar method in persistence and returns the Production object
        return null;
    }

    @Override
    public Batch fetchBatchFromDatabase(int batchId) {
        //TODO insert code which invokes the similar method in persistence and returns the Batch object
        return null;
    }

    @Override
    public ArrayList<Batch> fetchBatchesFromDatabase() {
        //TODO insert code which invokes the similar method in persistence and returns the ArrayList<Batch>
        return null;
    }
    //endregion

//      COMMENTED OUT BECAUSE RELEVANCE?
//    /**
//     * Other things....
//     */
//    //region
//    @Override
//    public Production createProduction() {
//        //TODO Randomly generate a productionId, create a batch and add it to the arraylist
//        Production production = new Production();
//        return production;
//    }
//    //endregion

    /**
     * Optimization calculations
     */
    //region
    @Override
    public double calculateErrorMargin(BeerType beerType, double speed) {
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
}
