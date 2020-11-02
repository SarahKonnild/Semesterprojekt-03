package Persistence;

import Domain.Batch;
import Domain.BeerType;
import Domain.Production;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JsonToProductionsConverter {

    protected static ArrayList<Production> docsToProductions(ArrayList<Document> productions){
        Logger.getLogger("").setLevel(Level.WARNING);
        // read db and collection
        try {
            // create list to store the final list to be returned, filled with productions.
            ArrayList<Production> finalList = new ArrayList<>();

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

                    // beerType attribute
                    BeerType beerType = BeerTypeSelector.getBeerType(jsonObject2.get("beerType").toString());

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
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
