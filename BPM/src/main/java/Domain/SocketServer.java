package Domain;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.sql.Date;

public class SocketServer {

    public static ServerSocket serverSocket;

    public static void main(String[] args) {
        listen();
    }

    /**
     * Socket related things
     */
    //Sauce: https://gist.github.com/mpj/a979ded460dd52eb536a
    public static void listen() {
        try {
            serverSocket = new ServerSocket(8000);
        } catch (IOException e) {
            e.printStackTrace();
        }
        while (true) {
            try {
                final Socket socket = serverSocket.accept();
                final InputStream inputStream = socket.getInputStream();
                final InputStreamReader streamReader = new InputStreamReader(inputStream);
                BufferedReader br = new BufferedReader(streamReader);

                String[] lineArray = null;
                String line = null;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                    lineArray = line.split(",");
                    for (int i = 1; i < lineArray.length; i++) {
                        //TODO fix the regex so that it doesn't split the time into smaller unusable pieces of garbage
                        String[] newArray = lineArray[i].split(":", 1);
                        System.out.println(lineArray[i]);
                        lineArray[i] = newArray[1];
                    }
                    switch (lineArray[0]) {
                        case "/startProduction": {
                            System.out.println(lineArray[2]);
                            int batchId = Integer.parseInt(lineArray[1]);
                            Date timestamp = Date.valueOf(lineArray[2]);
                            BeerType beerType = BeerType.valueOf(lineArray[3]);
                            int batchSize = Integer.parseInt(lineArray[4]);
                            double productionSpeed = Double.parseDouble(lineArray[5]);
                            int productionId = Integer.parseInt(lineArray[6]);

                            Facade.getFacade().startProduction(batchId, timestamp, beerType, batchSize, productionSpeed, productionId);
                            break;
                        }
                        case "/stopProduction": {
                            int productionId = Integer.parseInt(lineArray[1]);
                            int batchId = Integer.parseInt(lineArray[2]);
                            Date startTime = Date.valueOf(lineArray[3]);
                            BeerType beerType = BeerType.valueOf(lineArray[4]);
                            int batchSize =  Integer.parseInt(lineArray[1]);
                            double productionSpeed = Double.parseDouble(lineArray[5]);

                            Batch batch = new Batch(batchId, startTime,beerType, batchSize, productionSpeed,productionId);
                            Production production = new Production(productionId, batch);

                            Facade.getFacade().stopProduction(production);
                            break;
                        }
                        case "/detectMaintenanceStatus": {
                            Facade.getFacade().detectMaintenanceStatus();
                            break;
                        }
                        case "/calculateErrorSpeed": {
                            BeerType beerType = BeerType.valueOf(lineArray[1]);
                            double speed = Double.parseDouble(lineArray[2]);

                            Facade.getFacade().calculateErrorSpeed(beerType, speed);
                            break;
                        }
                        case "/calculateErrorMargin": {
                            BeerType beerType = BeerType.valueOf(lineArray[1]);
                            int batchSize = Integer.parseInt(lineArray[2]);

                            Facade.getFacade().calculateErrorMargin(beerType, batchSize);
                            break;
                        }
                        case "/caclulateOptimalSpeed": {
                            BeerType beerType = BeerType.valueOf(lineArray[1]);
                            double errorMargin = Double.parseDouble(lineArray[2]);

                            Facade.getFacade().calculateOptimalSpeed(beerType, errorMargin);
                            break;
                        }
                        default: {
                            //TODO DEBUG THIS :3 uwu
                            System.out.println("OH YES, DADDY SVANE BAMBOOZLED YOU <3");
                        }
                    }
                    System.out.println(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
//                System.exit(-1);
            }
        }
    }

}
