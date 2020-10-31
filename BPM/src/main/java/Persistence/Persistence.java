package Persistence;

import Domain.*;
import Interfaces.IPersistence;
import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
                int batchId = (Integer.parseInt(bat.get("batchId").toString()));

                DateFormat df = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm:ss");
                String time = (String) bat.get("timestamp");
                Date startTime = df.parse(time);
                
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
                    case "NON-ALCOHOLIC":
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
                double productionSpeed = (double)Float.parseFloat(bat.get("productionSpeed").toString());
                double temp = (double)Float.parseFloat(bat.get("temp").toString());
                double humidity = (double)Float.parseFloat(bat.get("humidity").toString());
                double vib = (double)Float.parseFloat(bat.get("vibration").toString());
                String objId = bat.get("_id").toString();
                Batch batch = new Batch(batchId, startTime, beerType, batchSize, defects, productionSpeed, temp, humidity, vib, objId);
                finalList.add(batch);
            }
            return finalList;
        } catch (ParseException e) {
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

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBProduction = database.getCollection("productions");

            //Read productions from MongoDB
            List<Document> productions = DBProduction.find().into(new ArrayList<Document>());
            List<Production> finalList = new ArrayList<>();

            for (Document prod : productions) {
                int productionId = Integer.parseInt(prod.get("productionId").toString());
                Production production = new Production(productionId, getBatches());
                finalList.add(production);
            }
            return finalList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // not finished
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
                switch (ingredientTypeString){
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
                double stock = (double)Float.parseFloat(ingredient.get("stock").toString());
                Ingredient ingredient1 = new Ingredient(ingredientId, ingredientType, stock);
                finalList.add(ingredient1);
            }
            return finalList;

        } catch (MongoException e){
            e.printStackTrace(System.err);
        }
        return null;
    }

    @Override
    public void createBatch() {

    }

    @Override
    public void createProduction() {

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

        }
        catch (MongoException e){
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


        }
        catch (MongoException e){
            e.printStackTrace();
        }
    }
}

