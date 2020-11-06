package Domain;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

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

                String line = null;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                }

            }catch(IOException e){
                e.printStackTrace();
                System.exit(-1);
            }
        }
    }

}
