package com.oceanica.springboot_oceanica.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ItemDTO {

    @NotNull(message = "El producto ID no puede ser nulo")
    private Long productoId;

    @Positive(message = "La cantidad debe ser mayor que 0")
    private int cantidad;

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}

