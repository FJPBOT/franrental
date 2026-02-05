package com.franrental.backend.service;

import com.franrental.backend.model.Reservation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendReservationConfirmation(Reservation reservation) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(reservation.getUser().getEmail());
            message.setSubject("Confirmacion de Reserva - FranRental");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String startDate = reservation.getStartDate().format(formatter);
            String endDate = reservation.getEndDate().format(formatter);

            String body = String.format(
                "Hola %s,\n\n" +
                "Tu reserva ha sido confirmada exitosamente.\n\n" +
                "Detalles de la reserva:\n" +
                "- Vehiculo: %s\n" +
                "- Fecha de inicio: %s\n" +
                "- Fecha de fin: %s\n" +
                "- Total: $%.2f\n\n" +
                "Gracias por elegir FranRental.\n\n" +
                "Saludos,\n" +
                "El equipo de FranRental",
                reservation.getUser().getName(),
                reservation.getVehicle().getName(),
                startDate,
                endDate,
                reservation.getTotalPrice()
            );

            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
