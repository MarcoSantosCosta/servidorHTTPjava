package com.core.comunication;

import com.core.BufferRequest;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Server extends Thread {


    private int port;
    private boolean status;
    private BufferRequest buff;
    private ServerSocket serverSocket;


    public Server(int port) {
        this.port = port;
        this.buff = BufferRequest.getInstance();
    }

    public void run() {

        this.status = true;
        try {
            this.serverSocket = new ServerSocket(this.port);
            while (this.status) {
                Socket s = this.serverSocket.accept();
//                System.out.println("RECEBI UMA REQUISIÇÃO");
                if (!buff.queue(s)) {
                    PrintWriter out = new PrintWriter(s.getOutputStream(), true);
                    out.println("HTTP/1.0 500  Internal Server Error");
                    out.println("Content-Type: text/html\n");
                    out.println("<HTML><HEAD><TITLE>BUffer Cheio</TITLE></HEAD><BODY>Buffer Cheio</BODY></HTML>");
                }
            }
        } catch (IOException e) {
            System.err.println("Could not listen on port: " + this.port);
            System.exit(1);
        } finally {
            try {
                serverSocket.close();
            } catch (IOException e) {
                System.err.println("Could not close port: " + this.port);
                System.exit(1);
            }
        }
    }
}
