package com.oceanica.springboot_oceanica.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Item {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private int cantidad;
   private double precio_unitario;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

   public Long getId() {
       return id;
   }

   public void setId(Long id) {
       this.id = id;
   }

   public int getCantidad() {
       return cantidad;
   }

   public void setCantidad(int cantidad) {
       this.cantidad = cantidad;
   }

   public double getPrecio_unitario() {
       return precio_unitario;
   }

   public void setPrecio_unitario(double precio_unitario) {
       this.precio_unitario = precio_unitario;
   }

   public Producto getProducto() {
        return producto;
   }

   public void setProducto(Producto producto) {
        this.producto = producto;
   }


}
