package Persistence;

import java.util.List;

import Domain.Batch;
import Domain.Production;

public class Main {

    public static void main(String[] args) {
        Persistence persistence = new Persistence();
        List<Batch> batchList = persistence.getBatches();
        /*System.out.println(batchList.get(0).toString());
        System.out.println(batchList.get(1).toString());
        List<Production> productions = persistence.getProductions();
        System.out.println(productions.get(0).toString());
        System.out.println(batchList.get(0).toString());*/

        List<Production> productionList = persistence.getProductions();
        System.out.println(productionList.get(0).toString());
    }
}
