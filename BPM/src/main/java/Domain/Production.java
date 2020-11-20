package Domain;

import Interfaces.IProduction;

import java.util.ArrayList;
import java.util.Date;

public class Production implements IProduction {

    private int productionId;
    private Batch batch;
    private ArrayList<Batch> batchQueue;

    public Production(){

    }

    public Production(int productionId, Batch batch){
        this.productionId = productionId;
        this.batch = batch;
    }

    @Override
    public int getProductionId() {
        return productionId;
    }

    @Override
    public void setProductionId(int productionId) {
        this.productionId = productionId;
    }

    @Override
    public Batch getBatch() {
        return batch;
    }

    @Override
    public void setBatch(Batch batch) {
        this.batch = batch;
    }

    @Override
    public String toString() {
        return "Production{\n" +
                "productionId=" + productionId +
                ",\nbatchQueue=\n" + batchQueue +
                "\n}";
    }
}
