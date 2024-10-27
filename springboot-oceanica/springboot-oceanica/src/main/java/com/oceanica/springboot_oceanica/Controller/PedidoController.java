package com.oceanica.springboot_oceanica.Controller;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oceanica.springboot_oceanica.Repository.ItemRepository;
import com.oceanica.springboot_oceanica.Repository.PedidoRepository;
import com.oceanica.springboot_oceanica.Repository.ProductoRepository;
import com.oceanica.springboot_oceanica.Repository.UsuarioRepository;
import com.oceanica.springboot_oceanica.dto.ItemDTO;
import com.oceanica.springboot_oceanica.dto.PedidoDTO;

import jakarta.validation.Valid;

import com.oceanica.springboot_oceanica.Model.Categoria;
import com.oceanica.springboot_oceanica.Model.Item;
import com.oceanica.springboot_oceanica.Model.Pedido;
import com.oceanica.springboot_oceanica.Model.Producto;
import com.oceanica.springboot_oceanica.Model.Usuario;
import com.oceanica.springboot_oceanica.Model.Enums.EstadoPedido;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/pedido")
@Validated
public class PedidoController {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @PostMapping("/public")
    public ResponseEntity<String> createPedido(@Valid @RequestBody PedidoDTO pedidoRequest) {
        if (pedidoRequest.getItems() == null || pedidoRequest.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("El pedido debe tener al menos un item.");
        }

        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDate.now());
        pedido.setDireccion(pedidoRequest.getDireccion());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setTotal(pedidoRequest.getTotal());


        for (ItemDTO itemDTO : pedidoRequest.getItems()) {
            Optional<Producto> productoOpt = productoRepository.findById(itemDTO.getProductoId());
            if (productoOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Producto con ID " + itemDTO.getProductoId() + " no encontrado");
            }

            // Extraer el objeto Producto del Optional
            Producto producto = productoOpt.get();

            if (producto.getStock() < itemDTO.getCantidad()) {
                return ResponseEntity.status( 400).body("Producto con ID:" + itemDTO.getProductoId()+ " no tiene suficientes productos en stock");
            }

            // Actualizar stock
            producto.setStock(producto.getStock() - itemDTO.getCantidad());

            productoRepository.save(producto);

            Item item = new Item();
            item.setProducto(producto);
            item.setCantidad(itemDTO.getCantidad());
            item.setPrecio_unitario(producto.getPrecio());
            pedido.addItem(item);
            
        }


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(username);
            if (usuarioOpt.isPresent()) {
                pedido.setUsuario(usuarioOpt.get());
            } else {
                //return ResponseEntity.status(404).body("Usuario no encontrado");
            }
        }
        
        Pedido pedidoCreado = pedidoRepository.save(pedido);


        return ResponseEntity.ok("Pedido creado exitosamente.");
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/pendientes")
    public ResponseEntity<List<Pedido>> getPedidosPendientes() {
        List<Pedido> pedidosPendientes = pedidoRepository.findByEstado(EstadoPedido.PENDIENTE);
        return ResponseEntity.ok(pedidosPendientes);
    }
    
    
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getPedidoById(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if(pedido.isPresent()) {
            return ResponseEntity.ok(pedido.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePedido(@PathVariable Long id,@Valid @RequestBody Pedido pedidoDetails) {
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);

        if (pedidoOpt.isPresent()) {
            Pedido pedidoActualizado = pedidoOpt.get();

            pedidoActualizado.setFecha(pedidoActualizado.getFecha());
            pedidoActualizado.setTotal(pedidoDetails.getTotal());
            pedidoActualizado.setDireccion(pedidoDetails.getDireccion());
            pedidoActualizado.setEstado(EstadoPedido.ENVIADO);

        
            pedidoRepository.save(pedidoActualizado);
            return ResponseEntity.ok(pedidoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    

}
