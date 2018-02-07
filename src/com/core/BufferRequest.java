package com.core;

import com.interfaces.core.BufferListener;

import java.net.Socket;
import java.util.ArrayList;

public class BufferRequest {


    private static BufferRequest instance = null;
    private ArrayList<Socket> buffer;
    private int size;
    private ArrayList<BufferListener> listeners;
    private boolean inUse;


    private BufferRequest() {
        this.buffer = new ArrayList<>();
        this.size = 10;
        this.listeners = new ArrayList();
        this.inUse = false;
    }

    private void notify(Socket socket) {
        for (BufferListener litener : this.listeners) {
            litener.onReceiveRequest(socket);
        }
    }


    public void addListener(BufferListener listener) {
        this.listeners.add(listener);
    }

    public static BufferRequest getInstance() {
        if (instance == null) {
            instance = new BufferRequest();
        }
        return instance;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public synchronized boolean queue(Socket s) {
        while (this.inUse);
        this.inUse = true;
        if (this.buffer.size() < this.size) {
//            System.out.println("Empilhei essa requisição");
            this.buffer.add(s);
            this.notify(s);
            this.inUse = false;
            return true;
        }
        this.inUse = false;
//       System.out.println("Não posso atender essa requisição");
        return false;
    }

    public synchronized Socket dequeue() {
        while (this.inUse) ;
        this.inUse = true;
        if (this.buffer.size() > 0) {
            Socket s = this.buffer.get(0);
            this.buffer.remove(0);
            this.inUse = false;
            return s;
        }
        this.inUse = false;
        return null;
    }
}
