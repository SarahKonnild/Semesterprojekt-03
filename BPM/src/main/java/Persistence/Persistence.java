package Persistence;

import Domain.Batch;
import Domain.BeerType;
import Interfaces.IPersistence;
import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import org.bson.Document;

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
    public List<Batch> getBatches() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatch = database.getCollection("batches");

            //Read batches from MongoDB
            List<Document> batches = DBBatch.find().into(new ArrayList<Document>());

            for (Document batch : batches) {
                int batchId = (Integer.parseInt(batch.get("batchId").toString()));
                Date startTime = (Date) batch.get("startTime");
                BeerType beerType = (BeerType) batch.get("beertype");
                int batchSize = (Integer.parseInt(batch.get("batchSize").toString()));
                int productionSpeed = (Integer.parseInt(batch.get("productionSpeed").toString()));
                Batch batch1 = new Batch(batchId, startTime, beerType, batchSize, productionSpeed);
                System.out.println("Batches: " + "id " + batch1.getBatchId() +
                        " Batch Size " +  batch1.getBatchSize() +
                        " Beertype " + batch1.getBeerType());
            }


        }
        return null;
    }

    @Override
    public void getProductions() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBProduction = database.getCollection("productions");

            //Read productions from MongoDB
            List<Document> productions = DBProduction.find().into(new ArrayList<Document>());

            for (Document production : productions) {
                System.out.println("Productions: " + production.toJson());
            }
        }
    }

    @Override
    public void getIngredients() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBIngredients = database.getCollection("ingredients");

            //Read ingredients from MongoDB
            List<Document> ingredients = DBIngredients.find().into(new ArrayList<Document>());

            for (Document ingredient : ingredients) {
                System.out.println("Ingredients: " + ingredient.toJson());
            }

        }
    }

    @Override
    public void createBatch() {

    }

    @Override
    public void createProduction() {

    }

    @Override
    public void deleteBatch() {

    }

    @Override
    public void deleteProductions() {

    }

}

