package com.oceanica.springboot_oceanica.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oceanica.springboot_oceanica.Repository.PedidoRepository;
import com.oceanica.springboot_oceanica.Model.Pedido;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/pedido")
public class PedidoController {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }


    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/enviados")
    public ResponseEntity<List<Pedido>> getPedidosEnviados() {
        List<Pedido> pedidosEnviados = pedidoRepository.findByEstado("enviado");
        return ResponseEntity.ok(pedidosEnviados);
    }


    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/pendientes")
    public ResponseEntity<List<Pedido>> getPedidosPendientes() {
        List<Pedido> pedidosPendientes = pedidoRepository.findByEstado("pendiente");
        return ResponseEntity.ok(pedidosPendientes);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductoById(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if(pedido.isPresent()) {
            return ResponseEntity.ok(pedido.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    

}
