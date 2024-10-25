package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Usuario;
import com.oceanica.springboot_oceanica.Repository.UsuarioRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/registro")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {

        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return ResponseEntity.status(400).body("Correo ya registrado.");
        }

        usuario.setHash_password(passwordEncoder.encode(usuario.getHash_password()));

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String correo, @RequestParam String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (passwordEncoder.matches(password, usuario.getHash_password())) {
                return ResponseEntity.ok("Login exitoso.");
            } else {
                return ResponseEntity.status(400).body("Contraseña incorrecta.");
            }
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }
    }
}
