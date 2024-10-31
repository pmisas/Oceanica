package com.oceanica.springboot_oceanica.Repository;

import com.oceanica.springboot_oceanica.Model.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategorias_Nombre(String nombre);
}

