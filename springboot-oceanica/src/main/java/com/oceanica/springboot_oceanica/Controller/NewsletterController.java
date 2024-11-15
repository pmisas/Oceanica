package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Newsletter;
import com.oceanica.springboot_oceanica.Repository.NewsletterRepository;
import com.oceanica.springboot_oceanica.dto.BoletinDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NewsletterRepository newsletterRepository;

    private void enviarCorreo(String destinatario, String asunto, String mensaje) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(destinatario);
        email.setSubject(asunto);
        email.setText(mensaje);
        mailSender.send(email);
    }

    @PostMapping("/suscribir")
    public String suscribir(@RequestBody Newsletter suscriptor) {
        newsletterRepository.save(suscriptor);
        return "Suscripción exitosa";
    }

    @PostMapping("/enviar-boletin")
    public String enviarBoletin(@RequestBody BoletinDTO boletinRequest) {
        List<Newsletter> suscriptores = newsletterRepository.findAll();
        for (Newsletter suscriptor : suscriptores) {
            enviarCorreo(suscriptor.getEmail(), boletinRequest.getAsunto(), boletinRequest.getMensaje());
        }
        return "Boletín enviado a todos los suscriptores";
    }
}
