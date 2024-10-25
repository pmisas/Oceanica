package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Usuario;
import com.oceanica.springboot_oceanica.Repository.UsuarioRepository;
import com.oceanica.springboot_oceanica.Security.JwtUtils;

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

    @Autowired
    private JwtUtils jwtUtils;

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
    public String loginUser(@RequestBody Usuario usuario) {
        Optional<Usuario> user = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (user.isPresent() && passwordEncoder.matches(usuario.getHash_password(), user.get().getHash_password())) {
            String role = user.get().getRol();
            String token = jwtUtils.generateToken(user.get().getCorreo(), role);
            return "Login exitoso. Token: " + token;
        } else {
            return "Credenciales inválidas";
        }
    }
}
