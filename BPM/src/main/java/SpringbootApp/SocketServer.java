package SpringbootApp;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;
import java.sql.Date;

public class SocketServer {

    public static ServerSocket serverSocket;
    public static Socket apiSocket;

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
                    lineArray = line.split(",");
                    for (int i = 1; i < lineArray.length; i++) {
                        //TODO fix the regex so that it doesn't split the time into smaller unusable pieces of garbage
                        String[] newArray = lineArray[i-1].split(":", 1);
                        System.out.println(lineArray[i-1] + " " + i);
                        lineArray[i-1] = newArray[i-1];
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
                            apiSocket = new Socket();
                            String string = String.valueOf(Facade.getFacade().detectMaintenanceStatus());
                            URL url = new URL("http://localhost:3000/detectedStatus");
                            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                            conn.setRequestMethod("POST");
                            conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
                            conn.setRequestProperty("Content-length", Integer.toString(string.length()));
                            conn.setRequestProperty("Content-Language", "en-GB");
                            conn.setRequestProperty("charset", "utf-8");
                            conn.setUseCaches(false);
                            conn.setDoOutput(true);
                            DataOutputStream dout = new DataOutputStream(conn.getOutputStream());
                            dout.writeBytes(string);
                            dout.close();
                            conn.disconnect();

////                            PrintWriter pw = new PrintWriter(output, true);
////                            pw.println(Facade.getFacade().detectMaintenanceStatus());
//                            output = new DataOutputStream(apiSocket.getOutputStream());
//                            output.write(Facade.getFacade().detectMaintenanceStatus());
//                            Unirest.setObjectMapper(new ObjectMapper() {
//                                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
//
//                                @Override
//                                public <T> T readValue(String s, Class<T> aClass) {
//                                    try {
//                                        return mapper.readValue(s, aClass);
//                                    } catch (JsonProcessingException e) {
//                                        e.printStackTrace();
//                                        return null;
//                                    }
//                                }
//
//                                @Override
//                                public String writeValue(Object o) {
//                                    try {
//                                        return mapper.writeValueAsString(o);
//                                    } catch (JsonProcessingException e) {
//                                        e.printStackTrace();
//                                        return null;
//                                    }
//                                }
//                            });
//
//                            String string = "[\"statusCode\":" + Facade.getFacade().detectMaintenanceStatus() + " ]";
//
//                            class SomeClass{
//                                int someValue;
//
//                                public SomeClass(int someValue){
//                                    this.someValue = someValue;
//                                }
//                            }
//
//                            Unirest.post("http://localhost:3000/detectedStatus").header("Content-Type", "application/json").body(new SomeClass(Facade.getFacade().detectMaintenanceStatus())).asJson();
//                            BufferedOutputStream bout = new BufferedOutputStream(socket.getOutputStream());
//                            DataOutputStream dout = new DataOutputStream(bout);
//                            dout.write(Facade.getFacade().detectMaintenanceStatus());
//                            System.out.println(Facade.getFacade().detectMaintenanceStatus());
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
                }
            } catch (IOException e) {
                e.printStackTrace();
//                System.exit(-1);
            }
        }
    }

}
