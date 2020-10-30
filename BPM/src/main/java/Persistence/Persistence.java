package Persistence;

import Interfaces.IPersistence;
import com.mongodb.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
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
    public void getBatches() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBProduction = database.getCollection("batches");

            //Read productions from MongoDB
            Document production = DBProduction.find().first();
            System.out.println("Production " + production.toJson());

        }
    }

    @Override
    public void getProductions() {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //ConnectionString to MongoDB
        ConnectionString connectionString = new ConnectionString("mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatch = database.getCollection("productions");

            //Read batches from MongoDB
            Document batches = DBBatch.find().first();
            System.out.println("Batches " + batches.toJson());

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
            Document ingredients = DBIngredients.find().first();
            System.out.println("Ingredients " + ingredients.toJson());

        }
    }

    public void main(String[] args) {
        getBatches();
        getProductions();
        getIngredients();
    }
}

