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

    public static void main(String[] args){
        listen();
    }

    /**
     * Socket related things
     */
    //Sauce: https://gist.github.com/mpj/a979ded460dd52eb536a
    public static void listen(){
        try{
            serverSocket = new ServerSocket(8000);
        }catch(IOException e){
            e.printStackTrace();
        }
        while(true){
            try{
                final Socket socket = serverSocket.accept();
                final InputStream inputStream = socket.getInputStream();
                final InputStreamReader streamReader = new InputStreamReader(inputStream);
                BufferedReader br = new BufferedReader(streamReader);

                String[] lineArray = null;
                String line = null;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                    lineArray = line.split(",");
                    for(int i = 1; i < lineArray.length; i++){
                        //TODO fix the regex so that it doesn't split the time into smaller unusable pieces of garbage
                        String[] newArray = lineArray[i].split(":");
                        System.out.println(lineArray[i]);
                        lineArray[i] = newArray[1];
                    }
                    switch (lineArray[0]){
                        case "/startProduction":
                            System.out.println(lineArray[2]);
                            Facade.getFacade().startProduction(Integer.parseInt(lineArray[1]), Date.valueOf(lineArray[2]), BeerType.valueOf(lineArray[3]), Integer.parseInt(lineArray[4]), Double.parseDouble(lineArray[5]), Integer.parseInt(lineArray[6]));
                            break;
                        case "/stopProduction":
                            Facade.getFacade().stopProduction(new Production(Integer.parseInt(lineArray[1]),new Batch(Integer.parseInt(lineArray[2]), Date.valueOf(lineArray[3]), BeerType.valueOf(lineArray[4]),
                                    Integer.parseInt(lineArray[5]), Double.parseDouble(lineArray[6]), Integer.parseInt(lineArray[7]))));
                            break;
                        case "/detectMaintenanceStatus":
                            Facade.getFacade().detectMaintenanceStatus();
                            break;
                        case "/calculateErrorSpeed":
                            Facade.getFacade().calculateErrorSpeed(BeerType.valueOf(lineArray[1]), Double.valueOf(lineArray[2]));
                            break;
                        case "/calculateErrorMargin":
                            Facade.getFacade().calculateErrorMargin(BeerType.valueOf(lineArray[1]), Integer.parseInt(lineArray[2]));
                            break;
                        case "/caclulateOptimalSpeed":
                            Facade.getFacade().calculateOptimalSpeed(BeerType.valueOf(lineArray[1]), Double.valueOf(lineArray[2]));
                            break;
                        default:
                            //TODO DEBUG THIS :3 uwu
                            System.out.println("OH YES, DADDY SVANE BAMBOOZLED YOU <3");
                    }
                    System.out.println(line);
                }
            }catch(IOException e){
                e.printStackTrace();
//                System.exit(-1);
            }
        }
    }

}
