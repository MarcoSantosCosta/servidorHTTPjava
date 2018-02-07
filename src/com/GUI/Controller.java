package com.GUI;

import com.core.HTTPServer;
import com.core.comunication.Processor;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

import java.awt.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class Controller implements Initializable {

    @FXML
    private Label status;

    @FXML
    private TextArea tela;

    @FXML
    private TextField qtdThreads;

    private HTTPServer server;

    @FXML
    private void handleButton() {
        int qtd = new Integer(qtdThreads.getText());
        this.server = new HTTPServer(8080, 10, qtd);
        server.start();

    }

    @FXML
    private void refresh() {
        ArrayList<Processor> threads = this.server.getThreads();
        StringBuilder sb = new StringBuilder();

        for (Processor p : threads) {
            sb.append(p.getName()).append("\n");
            String status = (p.getStatus() == 1) ? "Wainting" : "WORKING";
            sb.append("Status: ").append(status).append("\n");
            sb.append("Requisição: ").append(p.getUrlRequest()).append("\n");
            sb.append("Requisições: ").append(p.getRequest()).append("\n");
            sb.append("Sucedidas: ").append(p.getRequestSuccess()).append("\n");
            sb.append("Falhas: ").append(p.getRequestFailed()).append("\n");
            sb.append("-----------------------------------------------\n");
        }
        this.tela.setText(sb.toString());
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {

    }
}
