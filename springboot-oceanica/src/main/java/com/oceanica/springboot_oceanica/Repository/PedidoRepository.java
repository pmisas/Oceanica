package com.oceanica.springboot_oceanica.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oceanica.springboot_oceanica.Model.Pedido;
import com.oceanica.springboot_oceanica.Model.Enums.EstadoPedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    List<Pedido> findByEstado(EstadoPedido pendiente);

}
