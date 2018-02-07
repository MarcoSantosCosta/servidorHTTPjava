package com.core.comunication;

import com.core.BufferRequest;

import java.io.*;
import java.net.Socket;

public class Processor extends Thread {

    private Socket client;
    private int status;// 0 = Stoped, 1 = waiting, 2 = processing;
    private int request;
    private int requestSuccess;
    private int requestFailed;
    private String urlRequest;
    private BufferRequest buffer;
    private boolean isRun;


    public int getRequest() {
        return request;
    }

    public int getRequestFailed() {
        return requestFailed;
    }

    public int getRequestSuccess() {
        return requestSuccess;
    }


    public String getUrlRequest() {
        return urlRequest;
    }

    public Processor() {
        this.client = null;
        this.status = 1;
        this.request = 0;
        this.requestSuccess = 0;
        this.requestFailed = 0;
        this.urlRequest = "";
        this.buffer = BufferRequest.getInstance();
        this.isRun = true;
    }

    public void setClient(Socket client) {
        this.client = client;
    }

    private void process() {
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
            PrintWriter out = new PrintWriter(this.client.getOutputStream(), true);
            String requisicao = in.readLine();
            if (requisicao != null) {
                String partes[] = requisicao.split(" ");
                String filePath = partes[1].substring(1);
                this.urlRequest = filePath;
//                System.out.println("arquivo requisitado: " + filePath);
                try {
                    File f = new File("public/"+filePath);
                    if (f.exists()) {
                        BufferedReader fin = new BufferedReader(new FileReader(f));
                        out.println("HTTP/1.0 200 OK");
                        out.println("Content-Type: text/html\n");
                        String line;
                        while ((line = fin.readLine()) != null)
                            out.println(line);
                        fin.close();
                        this.requestSuccess++;
                    } else {
                        out.println("HTTP/1.0 404 Not Found");
                        out.println("Content-Type: text/html\n");
                        out.println("<HTML><HEAD><TITLE>Not Found</TITLE></HEAD><BODY>Not Found</BODY></HTML>");
                        this.requestFailed++;
                    }

                } catch (IOException e) {
                    this.requestFailed++;
                    e.printStackTrace();
                }
            }
            in.close();
            out.close();
            client.close();
        } catch (IOException e) {
            this.requestFailed++;
            System.err.println("Problem with Communication Server");
            this.status = 0;
            System.exit(1);
        }
    }

    public void run() {
        while (this.isRun) {
            this.client = this.buffer.dequeue();
            if (this.client != null) {
                this.status = 2;
                System.out.println("To trabalhando " + this.getName());
                this.request++;
//                System.out.println("Começei a processar");
                this.process();
//                System.out.println("Eu acho que agora deu bom");
                this.client = null;
            }
            this.status = 1;
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        try {
            join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public int getStatus() {
        return status;
    }
}
