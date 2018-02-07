package com.core;

import com.GUI.Controller;
import com.core.comunication.Processor;
import com.core.comunication.Server;
import com.interfaces.core.BufferListener;

import java.net.Socket;
import java.util.ArrayList;

public class HTTPServer implements BufferListener {

    private BufferRequest buffer;
    private int port;
    private ArrayList<Processor> threads;
    private int qtdThreads;

    public HTTPServer(int port, int bufferSize, int qtdThreads) {
        this.buffer = BufferRequest.getInstance();
        this.buffer.setSize(bufferSize);
        this.port = port;
        this.threads = new ArrayList();
        this.qtdThreads = qtdThreads;
    }

    @Override
    public void onReceiveRequest(Socket socket) {
//        System.out.println("TENHO QUE TRABALHAR");
    }

    public ArrayList<Processor> getThreads() {
        return threads;
    }

    private void startThreads() {
        for (int i = 0; i < this.qtdThreads; i++) {
            Processor p = new Processor();
            p.start();
            this.threads.add(p);
            System.out.println("Criei " + (i + 1) + " thred.");
        }
    }


    private Processor getFreeThread() {
        for (Processor p : this.threads) {
            if (p.getStatus() == 1) {
                System.out.println("Achei um thread atoa");
                return p;
            }
        }
        System.out.println("Tem ninguem atoa");
        return null;
    }

    private void interate() {
        while (true) {
            System.out.println("Vou olhar se tem algo pra fazer");
            Socket s = this.buffer.dequeue();
            if (s != null) {
                System.out.println("Tem algo pra fazer");
                Processor p;
                while ((p = getFreeThread()) == null) {
                    System.out.println("To esperandoa alguem desocupar");
                }
                p.setClient(s);
                System.out.println("Passeis os dados para a thread");
            }
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void start() {
//        System.out.println("Iniciei o servior");
        Server server = new Server(this.port);
        server.start();
        this.startThreads();
//        this.interate();
    }


}
