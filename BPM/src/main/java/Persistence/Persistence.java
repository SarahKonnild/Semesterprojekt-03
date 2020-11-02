package Persistence;

import Domain.*;
import Interfaces.IPersistence;
import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import javax.print.Doc;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Persistence implements IPersistence {
    private static Persistence instance;
    private ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");
    // MongoDatabase database;
    // MongoCollection<Document> collection;

    public Persistence() {
    }

    public static Persistence getInstance() {
        if (instance == null) {
            instance = new Persistence();
        }
        return instance;
    }

    // Used for first test of connection to db.
    /*public void DBConnect() {
        try {
            //Remove debugger log
            Logger.getLogger("").setLevel(Level.WARNING);

            //Connection to MongoDB
            // ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

            MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connectionString).retryWrites(true).build();

            try (com.mongodb.client.MongoClient mongoClient = MongoClients.create(settings)) {
                List<Document> databases = mongoClient.listDatabases().into(new ArrayList<>());
            } catch (MongoException exception) {
                exception.printStackTrace(System.err);
            }
        } catch (MongoException exception) {
            exception.printStackTrace(System.err);
        }
    }*/

    @Override
    public Batch getBatch(int bId) {
        Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("batches");
            ArrayList<Document> batches = collection.find(Filters.eq("_id", bId)).into(new ArrayList<Document>());
            ArrayList<Batch> finalList = JsonToBatchesConverter.docsToBatches(batches);
            return finalList.get(0);
        } catch (MongoException e) {
            e.printStackTrace();
        }
        return null;
    }


    // see getProductions for detailed comments on the steps in the method. All steps from this method is also in that one.
    @Override
    public ArrayList<Batch> getBatches() {
        Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("batches");
            ArrayList<Document> batches = collection.find().into(new ArrayList<Document>());
            ArrayList<Batch> finalList = JsonToBatchesConverter.docsToBatches(batches);
            return finalList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Production getProduction(int productionId) {
        Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("productions");
            ArrayList<Document> productionDocs = collection.find(Filters.eq("_id", productionId)).into(new ArrayList<Document>());
            ArrayList<Production> productions = JsonToProductionsConverter.docsToProductions(productionDocs);
            return productions.get(0);

        } catch (MongoException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<Production> getProductions() {
        Logger.getLogger("").setLevel(Level.WARNING);
        // read db and collection
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("productions");

            // List the collection documents
            ArrayList<Document> productions = collection.find().into(new ArrayList<Document>());
            // create list to store the final list to be returned, filled with productions.
            ArrayList<Production> finalList = JsonToProductionsConverter.docsToProductions(productions);
            return finalList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<Ingredient> getIngredients() {
        Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("ingredients");

            //Read ingredients from MongoDB
            ArrayList<Document> ingredients = collection.find().into(new ArrayList<Document>());
            ArrayList<Ingredient> finalList = new ArrayList<>();
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
        Logger.getLogger("").setLevel(Level.WARNING);
        Document document = new Document();
        document.append("_id", getNextBatchId())
                .append("startTime", batch.getStartTime().toString())
                .append("endTime", batch.getEndTime().toString())
                .append("beerType", batch.getBeerType().toString())
                .append("batchSize", batch.getBatchSize())
                .append("defects", batch.getDefectiveBeers())
                .append("productionSpeed", batch.getProductionSpeed())
                .append("temp", batch.getTemperature())
                .append("humidity", batch.getHumidity())
                .append("vibration", batch.getVibration());

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("batches");
            collection.insertOne(document);
            updateBatchIdCounter();
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

        // stores the batch separately to db.batches and inserts Batches into batDocList as key/value pairs
        for (Batch batch : production.getBatchQueue()) {
            int thisBatchId = getNextBatchId();
            createBatch(batch);
            batDocList.add(new Document().append("_id", thisBatchId)
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
        finalDoc.append("_id", getNextProductionId());
        // append batchQueue to finalDoc
        finalDoc.append("batchQueue", batDocList);

        //ConnectionString to MongoDB cluster
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("productions");

            // insert document into the collection
            collection.insertOne(finalDoc);
            updateProductionIdCounter();
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteBatch(int batchId) {
        Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("batches");

            collection.deleteOne(Filters.eq("_id", batchId));

        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteProduction(int productionId) {
        // Logger.getLogger("").setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("productions");
            List<Production> productions = getProductions();
            for (Production prod : productions) {
                if (prod.getProductionId() == productionId) {
                    List<Batch> batches = prod.getBatchQueue();
                    for (Batch batch : batches) {
                        deleteBatch(batch.getBatchId());
                    }
                }

            }
            collection.deleteOne(Filters.eq("_id", productionId));
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }

    private int getNextProductionId() {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("counters");
            ArrayList<Document> counterDoc = collection.find().into(new ArrayList<>());
            int productionId = Integer.parseInt(counterDoc.get(0).get("productionId").toString()) + 1;
            return productionId;
        } catch (MongoException e) {
            e.printStackTrace();
        }
        return 0;
    }

    private void updateProductionIdCounter() {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("counters");
            ArrayList<Document> counterDoc = collection.find().into(new ArrayList<>());
            int productionId = Integer.parseInt(counterDoc.get(0).get("productionId").toString());
            BasicDBObject query = new BasicDBObject();
            query.put("productionId", productionId);
            productionId++;

            BasicDBObject newCounterDoc = new BasicDBObject();
            newCounterDoc.put("productionId", productionId);

            BasicDBObject updateObject = new BasicDBObject();
            updateObject.put("$set", newCounterDoc);

            collection.updateOne(query, updateObject);
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }


    private int getNextBatchId() {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("counters");
            ArrayList<Document> counterDoc = collection.find().into(new ArrayList<>());
            int batchId = Integer.parseInt(counterDoc.get(0).get("batchId").toString()) + 1;
            return batchId;
        } catch (MongoException e) {
            e.printStackTrace();
        }
        return 0;
    }

    private void updateBatchIdCounter() {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("counters");
            ArrayList<Document> counterDoc = collection.find().into(new ArrayList<>());
            int batchId = Integer.parseInt(counterDoc.get(0).get("batchId").toString());
            BasicDBObject query = new BasicDBObject();
            query.put("batchId", batchId);
            batchId++;

            BasicDBObject newCounterDoc = new BasicDBObject();
            newCounterDoc.put("batchId", batchId);

            BasicDBObject updateObject = new BasicDBObject();
            updateObject.put("$set", newCounterDoc);

            collection.updateOne(query, updateObject);
        } catch (MongoException e) {
            e.printStackTrace();
        }
    }


    // used to test the methods. Uncomment and try - or be creative.
    public static void main(String[] args) {
        Persistence persistence = new Persistence();

        // createBatch()
        /*System.out.println("createBatch()");
        Batch batch = new Batch(new Date(), new Date(), BeerType.PILSNER, 300, 30, 250, 18.3, 3.1, 0.1);
        System.out.println("batch to be stored: \n" + batch.toString());
        persistence.createBatch(batch);
        System.out.println("\n_____________________________________________________________________");*/


        // createProduction()
        /*System.out.println("createProduction():");
        ArrayList<Batch> batches = new ArrayList<>();
        // create batches to be added to "batches" arraylist
        Batch batch1 = new Batch(new Date(), new Date(), BeerType.IPA, 400, 30, 400, 20, 10, 2);
        Batch batch2 = new Batch(new Date(), new Date(), BeerType.STOUT, 500, 200, 90, 15, 1, 0.5);
        // put batches in arraylist
        batches.add(batch1);
        batches.add(batch2);
        Production production = new Production(batches);
        System.out.println("Production to be stored:\n" + production);
        persistence.createProduction(production);
        System.out.println("\n_______________________________________________________________________________-");*/


        // getBatches()
        /*System.out.println("getBatches():\n");
        try {
            List<Batch> batchList = persistence.getBatches();
            System.out.println(batchList);
        } catch (NullPointerException e){
            System.out.println("Nothing to print");
        }
        System.out.println("\n________________________________________________________________________________");*/

        // getBatch(batchId)
        /*System.out.println("getBatch(2)\n");
        System.out.println(persistence.getBatch(2));*/


        // getProductions()
        /*List<Production> productionList = persistence.getProductions();
        System.out.println("getProductions():");
        System.out.println(productionList);
        System.out.println("\n_________________________________________________________________________________");*/

        // getProduction(int ProductionId)
        /*System.out.println("getProductions():");
        System.out.println(persistence.getProduction(2));*/


        // getIngredients()
        /*List<Ingredient> ingredients = persistence.getIngredients();
        System.out.println("getIngredients():");
        System.out.println(ingredients);
        System.out.println("\n_________________________________________________________________________________");*/

        // deleteBatch()
        /*System.out.println("deleteBatch():");
        persistence.deleteBatch(1);
        System.out.println("\n_____________________________________________________________________________");*/

        // deleteProduction()
        /*System.out.println("deleteProduction():");
        persistence.deleteProduction(2);
        System.out.println("\n_________________________________________________________________________");*/

        // getBatches()
        /*System.out.println("getBatches():\n");
        List<Batch> batchList2 = persistence.getBatches();
        System.out.println(batchList2);
        System.out.println("\n________________________________________________________________________________");*/


        // getProductions()
        System.out.println("getProductions():");
        List<Production> productionList2 = persistence.getProductions();
        System.out.println(productionList2);
        System.out.println("\n_________________________________________________________________________________");
        System.out.println("Finished");
    }
}

