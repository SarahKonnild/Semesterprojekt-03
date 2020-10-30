package Persistence;

import java.util.List;

import Domain.Batch;

public class Main {

    public static void main(String[] args) {
        Persistence persistence = new Persistence();
        List<Batch> batchList = persistence.getBatches();
        System.out.println(batchList.get(0).toString()); 
        System.out.println(batchList.get(1).toString());

    }
}
