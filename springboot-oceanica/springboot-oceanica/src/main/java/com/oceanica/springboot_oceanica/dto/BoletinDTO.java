package com.oceanica.springboot_oceanica.dto;

public class BoletinDTO {
    private String asunto;
    private String mensaje;


    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
