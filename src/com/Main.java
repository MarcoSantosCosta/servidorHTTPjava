package com;

import com.core.HTTPServer;
import com.core.comunication.Server;

public class Main {

    public static void main(String[] args) {
        HTTPServer server = new HTTPServer(8080,10, 4);
        server.start();
    }
}
