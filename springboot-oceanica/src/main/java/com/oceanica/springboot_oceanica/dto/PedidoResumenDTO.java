package com.oceanica.springboot_oceanica.dto;

import java.time.LocalDate;
import java.util.List;
import com.oceanica.springboot_oceanica.Model.Enums.EstadoPedido;

public class PedidoResumenDTO {
    private Long id;
    private LocalDate fecha;
    private double total;
    private String direccion;
    private EstadoPedido estado;
    private List<ItemResumenDTO> items;

    // Getter y Setter para id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter y Setter para fecha
    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    // Getter y Setter para total
    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    // Getter y Setter para direccion
    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    // Getter y Setter para estado
    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }

    // Getter y Setter para items
    public List<ItemResumenDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemResumenDTO> items) {
        this.items = items;
    }
}

