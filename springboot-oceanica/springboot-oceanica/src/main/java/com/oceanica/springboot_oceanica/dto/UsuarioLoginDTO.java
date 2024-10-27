package com.oceanica.springboot_oceanica.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UsuarioLoginDTO {

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "Debe proporcionar un correo válido")
    private String correo;

    @NotBlank(message = "La contraseña no puede estar vacía")
    private String hash_password;

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getHash_password() {
        return hash_password;
    }

    public void setHash_password(String hash_password) {
        this.hash_password = hash_password;
    }
}
