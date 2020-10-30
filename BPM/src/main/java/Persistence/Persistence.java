package Persistence;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.logging.Level;
import java.util.logging.Logger;

import static com.mongodb.client.model.Filters.eq;

public class Persistence {

    public static void main ( String[] args) {
        //Remove debugger log
        Logger.getLogger("").setLevel(Level.WARNING);

        //Connection to MongDB
        MongoClientURI uri = new MongoClientURI(
                "mongodb+srv://user1:test1234@sem03pg2.0eybl.mongodb.net/test?retryWrites=true&w=majority");

        try(MongoClient mongoClient = new MongoClient(uri)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> DBBatch = database.getCollection("batches");
            MongoCollection<Document> DBProduction = database.getCollection("productions");
            MongoCollection<Document> DBIngredients = database.getCollection("ingredients");

            //Read batches from MongoDB
            Document batches = DBBatch.find().first();
            System.out.println("Batches " + batches.toJson());

            //Read batches from MongoDB
            Document production = DBProduction.find().first();
            System.out.println("Production " + production.toJson());

            //Read batches from MongoDB
            Document ingredients = DBIngredients.find().first();
            System.out.println("Ingredients " + ingredients.toJson());
        }





    }
}
