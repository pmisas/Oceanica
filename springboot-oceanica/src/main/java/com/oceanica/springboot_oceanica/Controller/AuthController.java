package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Usuario;
import com.oceanica.springboot_oceanica.Model.Enums.RolUsuario;
import com.oceanica.springboot_oceanica.Repository.UsuarioRepository;
import com.oceanica.springboot_oceanica.Security.JwtUtils;
import com.oceanica.springboot_oceanica.dto.UsuarioLoginDTO;
import com.oceanica.springboot_oceanica.dto.UsuarioRegistroDTO;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/registro")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UsuarioRegistroDTO usuarioRegistroDTO) {

        if (usuarioRepository.findByCorreo(usuarioRegistroDTO.getCorreo()).isPresent()) {
            return ResponseEntity.status(400).body("Correo ya registrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(usuarioRegistroDTO.getCorreo());
        usuario.setHash_password(passwordEncoder.encode(usuarioRegistroDTO.getHash_password()));
        usuario.setRol(usuarioRegistroDTO.getRol());

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody UsuarioLoginDTO usuarioLoginDTO) {
        Optional<Usuario> user = usuarioRepository.findByCorreo(usuarioLoginDTO.getCorreo());
    
        if (user.isPresent() && passwordEncoder.matches(usuarioLoginDTO.getHash_password(), user.get().getHash_password())) {
            RolUsuario role = user.get().getRol();
            String token = jwtUtils.generateToken(user.get().getCorreo(), role);
        
            // Creamos una respuesta en formato JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login exitoso");
            response.put("token", token);
        
            return ResponseEntity.ok(response);
        } else {
            // Respuesta de error en formato JSON
            Map<String, String> response = new HashMap<>();
            response.put("error", "Credenciales inválidas");
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
