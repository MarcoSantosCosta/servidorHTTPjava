package com.interfaces.core;

import java.net.Socket;

public interface BufferListener {
    public void onReceiveRequest(Socket socket);
}
