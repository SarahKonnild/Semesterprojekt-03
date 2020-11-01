package Persistence;

import Domain.*;
import Interfaces.IPersistence;
import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.model.Filters;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.io.BsonOutput;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Persistence implements IPersistence {
    private static Persistence instance;

    public Persistence() {
        DBConnect();
    }

    public static Persistence getInstance() {
        if (instance == null) {
            instance = new Persistence();
        }
        return instance;
    }

    public void DBConnect() {
        try {
            //Remove debugger log
            Logger.getLogger("").setLevel(Level.WARNING);

            //Connection to MongoDB
            ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

            MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connectionString).retryWrites(true).build();

            try (com.mongodb.client.MongoClient mongoClient = MongoClients.create(settings)) {
                List<Document> databases = mongoClient.listDatabases().into(new ArrayList<>());
            } catch (MongoException exception) {
                exception.printStackTrace(System.err);
            }
        } catch (MongoException exception) {
            exception.printStackTrace(System.err);
        }
    }


    // see getProductions for detailed comments on the steps in the method. All steps from this method is also in that one.
    @Override
    public ArrayList<Batch> getBatches() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatch = database.getCollection("batches");

            //Read batches from MongoDB
            List<Document> batches = DBBatch.find().into(new ArrayList<Document>());
            ArrayList<Batch> finalList = new ArrayList<>();

            for (Document bat : batches) {
                int batchId = (Integer.parseInt(bat.get("_id").toString()));

                // creates Dateformatter to handle format from mongoDb
                DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);

                // startTime attribute
                String time = (String) bat.get("startTime");
                Date startTime = df.parse(time);

                // endTime attribute
                String time2 = bat.get("endTime").toString();
                Date endTime = df.parse(time2);

                String beerString = bat.get("beerType").toString().toUpperCase();
                BeerType beerType;
                switch (beerString) {
                    case "PILSNER":
                        beerType = BeerType.PILSNER;
                        break;
                    case "ALE":
                        beerType = BeerType.ALE;
                        break;
                    case "STOUT":
                        beerType = BeerType.STOUT;
                        break;
                    case "NON_ALCOHOLIC":
                        beerType = BeerType.NON_ALCOHOLIC;
                        break;
                    case "WHEAT":
                        beerType = BeerType.WHEAT;
                        break;
                    case "IPA":
                        beerType = BeerType.IPA;
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + beerString);
                }

                int batchSize = (Integer.parseInt(bat.get("batchSize").toString()));
                int defects = Integer.parseInt(bat.get("defects").toString());
                double productionSpeed = (double) Float.parseFloat(bat.get("productionSpeed").toString());
                double temp = (double) Float.parseFloat(bat.get("temp").toString());
                double humidity = (double) Float.parseFloat(bat.get("humidity").toString());
                double vib = (double) Float.parseFloat(bat.get("vibration").toString());
                Batch batch = new Batch(batchId, startTime, endTime, beerType, batchSize, productionSpeed, defects, temp, humidity, vib);
                finalList.add(batch);
            }
            return finalList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Production> getProductions() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        // read db and collection
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBProduction = database.getCollection("productions");

            // List the collection documents
            List<Document> productions = DBProduction.find().into(new ArrayList<Document>());
            // create list to store the final list to be returned, filled with productions.
            List<Production> finalList = new ArrayList<>();

            // go through all documents to create a production for each document, to be inserted to finalList
            for (Document prod : productions) {
                int productionId = Integer.parseInt(prod.get("_id").toString());

                // gets the batchQueue as JSONArray. Added org.json to dependency to solve this problem.
                JSONObject jsonObject = new JSONObject(prod);
                JSONArray jsonArray = jsonObject.getJSONArray("batchQueue");

                // creates list with JSONObjects from the JSONArray to be made into batch objects.
                ArrayList<JSONObject> bqList = new ArrayList<>();

                // creates the JSONObjects to be stored in bqList
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonObject1 = jsonArray.getJSONObject(i);
                    bqList.add(jsonObject1);
                }

                // creates a List of batch to store Batch objects, to be inserted into batchQueue for Production constructor.
                ArrayList<Batch> batchList = new ArrayList<>();

                // creates the Batch objects to be put in batchList by reading every attribute from mongo, and assigning them to java attributes.
                for (JSONObject jsonObject2 : bqList) {
                    int batchId = (Integer.parseInt(jsonObject2.get("_id").toString()));

                    // creates Dateformatter to handle format from mongoDb
                    DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);

                    // startTime attribute
                    String time = (String) jsonObject2.get("startTime");
                    Date startTime = df.parse(time);

                    // endTime attribute
                    String time2 = jsonObject2.get("endTime").toString();
                    Date endTime = df.parse(time2);

                    String beerString = jsonObject2.get("beerType").toString().toUpperCase();
                    BeerType beerType;
                    switch (beerString) {
                        case "PILSNER":
                            beerType = BeerType.PILSNER;
                            break;
                        case "ALE":
                            beerType = BeerType.ALE;
                            break;
                        case "STOUT":
                            beerType = BeerType.STOUT;
                            break;
                        case "NON_ALCOHOLIC":
                            beerType = BeerType.NON_ALCOHOLIC;
                            break;
                        case "WHEAT":
                            beerType = BeerType.WHEAT;
                            break;
                        case "IPA":
                            beerType = BeerType.IPA;
                            break;
                        default:
                            throw new IllegalStateException("Unexpected value: " + beerString);
                    }

                    int batchSize = (Integer.parseInt(jsonObject2.get("batchSize").toString()));
                    int defects = Integer.parseInt(jsonObject2.get("defects").toString());
                    double productionSpeed = (double) Float.parseFloat(jsonObject2.get("productionSpeed").toString());
                    double temp = (double) Float.parseFloat(jsonObject2.get("temp").toString());
                    double humidity = (double) Float.parseFloat(jsonObject2.get("humidity").toString());
                    double vib = (double) Float.parseFloat(jsonObject2.get("vibration").toString());
                    Batch batch = new Batch(batchId, startTime, endTime, beerType, batchSize, productionSpeed, defects, temp, humidity, vib);
                    batchList.add(batch);
                }
                Production production = new Production(productionId, batchList);
                finalList.add(production);
            }
            return finalList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    @Override
    public List<Ingredient> getIngredients() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBIngredients = database.getCollection("ingredients");

            //Read ingredients from MongoDB
            List<Document> ingredients = DBIngredients.find().into(new ArrayList<Document>());
            List<Ingredient> finalList = new ArrayList<>();
            for (Document ingredient : ingredients) {
                String ingredientTypeString = ingredient.get("name").toString().toUpperCase();
                IngredientType ingredientType;
                switch (ingredientTypeString) {
                    case "BARLEY":
                        ingredientType = IngredientType.BARLEY;
                        break;
                    case "HOPS":
                        ingredientType = IngredientType.HOPS;
                        break;
                    case "MALT":
                        ingredientType = IngredientType.MALT;
                        break;
                    case "WHEAT":
                        ingredientType = IngredientType.WHEAT;
                        break;
                    case "YEAST":
                        ingredientType = IngredientType.YEAST;
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + ingredientTypeString);
                }
                int ingredientId = Integer.parseInt(ingredient.get("ingredientId").toString());
                double stock = (double) Float.parseFloat(ingredient.get("stock").toString());
                Ingredient ingredient1 = new Ingredient(ingredientId, ingredientType, stock);
                finalList.add(ingredient1);
            }
            return finalList;

        } catch (MongoException e) {
            e.printStackTrace(System.err);
        }
        return null;
    }

    @Override
    public void createBatch(Batch batch) {
        Logger.getLogger("").setLevel(Level.WARNING);
        Document document = new Document();
        document.append("_id", batch.getBatchId())
                .append("startTime", batch.getStartTime().toString())
                .append("endTime", batch.getEndTime().toString())
                .append("beerType", batch.getBeerType().toString())
                .append("batchSize", batch.getBatchSize())
                .append("defects", batch.getDefectiveBeers())
                .append("productionSpeed", batch.getProductionSpeed())
                .append("temp", batch.getTemperature())
                .append("humidity", batch.getHumidity())
                .append("vibration", batch.getVibration());

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatches = database.getCollection("batches");
            DBBatches.insertOne(document);
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void createProduction(Production production) {
        Logger.getLogger("").setLevel(Level.WARNING);
        // creates document to store
        Document finalDoc = new Document();

        // creates List of Documents to embed in finalDoc as batchQueue
        ArrayList<Document> batDocList = new ArrayList<>();

        // creates the embedded documents and adds them to batDocList
        for (Batch batch : production.getBatchQueue()) {
            batDocList.add(new Document().append("_id", batch.getBatchId())
                    .append("startTime", batch.getStartTime().toString())
                    .append("endTime", batch.getEndTime().toString())
                    .append("beerType", batch.getBeerType().toString())
                    .append("batchSize", batch.getBatchSize())
                    .append("defects", batch.getDefectiveBeers())
                    .append("productionSpeed", batch.getProductionSpeed())
                    .append("temp", batch.getTemperature())
                    .append("humidity", batch.getHumidity())
                    .append("vibration", batch.getVibration()));
        }
        // append productionId to finalDoc
        finalDoc.append("_id", production.getProductionId());
        // append batchQueue to finalDoc
        finalDoc.append("batchQueue", batDocList);

        //ConnectionString to MongoDB cluster
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            // get the db
            MongoDatabase database = mongoClient.getDatabase("test");
            // get the collection
            MongoCollection<Document> DBBatches = database.getCollection("productions");
            // insert document to the collection
            DBBatches.insertOne(finalDoc);
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteBatch(int batchId) {
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatches = database.getCollection("batches");

            DBBatches.deleteOne(Filters.eq("batchId", batchId));

        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteProduction(int productionId) {
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBProductions = database.getCollection("productions");

            DBProductions.deleteOne(Filters.eq("productionId", productionId));


        } catch (MongoException e) {
            e.printStackTrace();
        }
    }


    // used to test the methods. Uncomment and try - or be creative.
    public static void main(String[] args) {
        Persistence persistence = new Persistence();

        // createBatch()
        /*System.out.println("createBatch()");
        Batch batch = new Batch(1, new Date(), BeerType.NON_ALCOHOLIC, 340, 30,
                260.0, 15.1, 10.0, 2.0);
        System.out.println("batch to be stored: \n" + batch.toString());
        persistence.createBatch(batch);
        System.out.println("\n_____________________________________________________________________");*/


        // createProduction()
        System.out.println("createProduction():");
        ArrayList<Batch> batches = new ArrayList<>();
        // create batches to be added to "batches" arraylist
        Batch batch1 = new Batch(1, new Date(), new Date(), BeerType.PILSNER, 400, 30, 400, 20, 10, 2);
        Batch batch2 = new Batch(2, new Date(), new Date(), BeerType.NON_ALCOHOLIC, 500, 0, 90, 15, 1, 0.5);
        // put batches in arraylist
        batches.add(batch1);
        batches.add(batch2);
        Production production = new Production(1, batches);
        System.out.println("Production to be stored:\n" + production);
        persistence.createProduction(production);
        System.out.println("\n_______________________________________________________________________________-");


        // getBatches()
        /*System.out.println("getBatches():\n");
        try {
            List<Batch> batchList = persistence.getBatches();
            System.out.println(batchList);
        } catch (NullPointerException e){
            System.out.println("Nothing to print");
        }
        System.out.println("\n________________________________________________________________________________");*/


        // getProductions()
        List<Production> productionList = persistence.getProductions();
        System.out.println("getProductions():");
        System.out.println(productionList);
        System.out.println("\n_________________________________________________________________________________");

        // getIngredients()
        /*List<Ingredient> ingredients = persistence.getIngredients();
        System.out.println("getIngredients():");
        System.out.println(ingredients);
        System.out.println("\n_________________________________________________________________________________");*/

        // deleteBatch()
        /*System.out.println("deleteBatch():");
        persistence.deleteBatch(1);
        System.out.println("\n_____________________________________________________________________________");

        // deleteProduction()
        System.out.println("deleteProduction():");
        persistence.deleteProduction(1);
        System.out.println("\n_________________________________________________________________________");

        // getBatches()
        System.out.println("getBatches():\n");
        try {
            List<Batch> batchList2 = persistence.getBatches();
            System.out.println(batchList2);
        } catch (NullPointerException e){
            System.out.println("Nothing to print");
        }

        System.out.println("\n________________________________________________________________________________");


        // getProductions()
        System.out.println("getProductions():");
        try {
            List<Production> productionList2 = persistence.getProductions();
            System.out.println(productionList2);
        } catch (NullPointerException e){
            System.out.println("Nothing to print");
        }
        System.out.println("\n_________________________________________________________________________________");*/
        System.out.println("Finished");
    }
}

