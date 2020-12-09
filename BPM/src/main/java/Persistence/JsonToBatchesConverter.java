package Persistence;

import Domain.Batch;
import Domain.BeerType;
import org.bson.Document;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class JsonToBatchesConverter {
    protected static ArrayList<Batch> docsToBatches(ArrayList<Document> batches) {
        ArrayList<Batch> finalList = new ArrayList<>();
        try {
            for (Document batch : batches) {

                int batchId = Integer.parseInt(batch.get("_id").toString());
                // creates Dateformatter to handle format from mongoDb
                DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);

                // startTime attribute
                String time = (String) batch.get("startTime").toString();
                Date startTime = df.parse(time);

                // endTime attribute
                String time2 = batch.get("endTime").toString();
                Date endTime = df.parse(time2);

                BeerType beerType = BeerTypeSelector.getBeerType(batch.get("beerType").toString());
                int batchSize = Integer.parseInt(batch.get("batchSize").toString());
                double productionSpeed = (double) Float.parseFloat(batch.get("productionSpeed").toString());
                int defects = Integer.parseInt(batch.get("defects").toString());
                double temp = (double) Float.parseFloat(batch.get("temp").toString());
                double humidity = (double) Float.parseFloat(batch.get("humidity").toString());
                double vib = (double) Float.parseFloat(batch.get("vibration").toString());

//                Batch batch1 = new Batch(batchId, startTime, endTime, beerType, batchSize, productionSpeed, defects, temp,
//                        humidity, vib);
//                finalList.add(batch1);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return finalList;
    }
}
