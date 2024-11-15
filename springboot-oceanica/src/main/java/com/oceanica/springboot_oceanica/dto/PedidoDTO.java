package com.oceanica.springboot_oceanica.dto;

import java.util.Set;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class PedidoDTO {

    @NotBlank(message = "La dirección no puede estar vacía")
    private String direccion;

    @NotEmpty(message = "El pedido debe contener al menos un item.")
    private Set<ItemDTO> items;

    public String getDireccion() {
        return direccion;
    }

    private double total;

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Set<ItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<ItemDTO> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal() {
        this.total = total;
    }

}

