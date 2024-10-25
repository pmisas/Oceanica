package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Producto;
import com.oceanica.springboot_oceanica.Repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(ProductoController.class)
public class ProductoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductoRepository productoRepository;

    @Test
    public void testGetProductoById_Found() throws Exception {
        Producto producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Aletas de buceo");
        producto.setPrecio(45.0);

        // Simulamos que el repositorio devuelve el producto
        Mockito.when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/productos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Aletas de buceo"))
                .andExpect(jsonPath("$.precio").value(45.0));
    }

    @Test
    public void testGetProductoById_NotFound() throws Exception {
        // Simulamos que el repositorio devuelve un Optional.empty() cuando no se encuentra el producto
        Mockito.when(productoRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/productos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());  // Verificamos que se devuelva 404 Not Found
    }
}
