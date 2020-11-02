package Persistence;

import Domain.BeerType;

public class BeerTypeSelector {
    public static BeerType getBeerType(String beerType) {
        beerType = beerType.toUpperCase();
        BeerType bT;
        switch (beerType) {
            case "PILSNER":
                bT = BeerType.PILSNER;
                break;
            case "ALE":
                bT = BeerType.ALE;
                break;
            case "STOUT":
                bT = BeerType.STOUT;
                break;
            case "NON_ALCOHOLIC":
                bT = BeerType.NON_ALCOHOLIC;
                break;
            case "WHEAT":
                bT = BeerType.WHEAT;
                break;
            case "IPA":
                bT = BeerType.IPA;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + beerType);
        }

        return bT;
    }
}
