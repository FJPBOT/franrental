package com.franrental.backend.config;

import com.franrental.backend.model.Category;
import com.franrental.backend.model.Feature;
import com.franrental.backend.model.User;
import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.CategoryRepository;
import com.franrental.backend.repository.FeatureRepository;
import com.franrental.backend.repository.UserRepository;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(VehicleRepository vehicleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, FeatureRepository featureRepository, CategoryRepository categoryRepository) {
        return args -> {

            User admin = new User();
            admin.setName("Admin");
            admin.setLastName("FranRental");
            admin.setEmail("admin@franrental.com");
            admin.setPassword(passwordEncoder.encode("Admin123!"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Usuario ADMIN creado - Email: admin@franrental.com - Password: Admin123!");

            User normalUser = new User();
            normalUser.setName("Juan");
            normalUser.setLastName("Perez");
            normalUser.setEmail("juan@example.com");
            normalUser.setPassword(passwordEncoder.encode("password123"));
            normalUser.setRole("USER");
            userRepository.save(normalUser);

            Category sedan = new Category();
            sedan.setTitle("Sedan");
            sedan.setDescription("Vehiculos sedan comodos y economicos para uso diario");
            sedan.setImageUrl("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400");
            categoryRepository.save(sedan);

            Category suv = new Category();
            suv.setTitle("SUV");
            suv.setDescription("Vehiculos utilitarios deportivos espaciosos y versatiles");
            suv.setImageUrl("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400");
            categoryRepository.save(suv);

            Category deportivo = new Category();
            deportivo.setTitle("Deportivo");
            deportivo.setDescription("Vehiculos deportivos de alto rendimiento y velocidad");
            deportivo.setImageUrl("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400");
            categoryRepository.save(deportivo);

            Feature airConditioning = new Feature();
            airConditioning.setName("Aire Acondicionado");
            airConditioning.setIconUrl("https://cdn-icons-png.flaticon.com/512/2917/2917995.png");
            featureRepository.save(airConditioning);

            Feature gps = new Feature();
            gps.setName("GPS");
            gps.setIconUrl("https://cdn-icons-png.flaticon.com/512/854/854878.png");
            featureRepository.save(gps);

            Feature bluetooth = new Feature();
            bluetooth.setName("Bluetooth");
            bluetooth.setIconUrl("https://cdn-icons-png.flaticon.com/512/15047/15047435.png");
            featureRepository.save(bluetooth);

            Feature automaticTransmission = new Feature();
            automaticTransmission.setName("Transmision Automatica");
            automaticTransmission.setIconUrl("https://cdn-icons-png.flaticon.com/512/3097/3097089.png");
            featureRepository.save(automaticTransmission);

            Feature usbCharger = new Feature();
            usbCharger.setName("Cargador USB");
            usbCharger.setIconUrl("https://cdn-icons-png.flaticon.com/512/2991/2991108.png");
            featureRepository.save(usbCharger);

            vehicleRepository.save(createVehicleWithCategory("Toyota Corolla 2023", "Sedan compacto, ideal para ciudad y carretera", "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800", sedan, Arrays.asList(airConditioning, gps, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Honda Civic 2024", "Deportivo y elegante, perfecto para viajes largos", "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800", sedan, Arrays.asList(airConditioning, bluetooth, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Ford Mustang GT", "Potencia y estilo americano clasico", "https://images.unsplash.com/photo-1584345604476-8ec5f5ea8cda?w=800", deportivo, Arrays.asList(bluetooth, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Chevrolet Camaro SS", "Muscle car con motor V8 de alto rendimiento", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800", deportivo, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Tesla Model 3", "Vehiculo electrico con autopilot avanzado", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800", sedan, Arrays.asList(gps, bluetooth, usbCharger, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("BMW X5 2023", "SUV de lujo con tecnologia de punta", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth, automaticTransmission, usbCharger)));
            vehicleRepository.save(createVehicleWithCategory("Mercedes-Benz GLE", "Confort y elegancia en cada viaje", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Audi Q7 Premium", "Espacio y tecnologia para toda la familia", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", suv, Arrays.asList(airConditioning, gps, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Jeep Wrangler Rubicon", "Aventura extrema en cualquier terreno", "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Porsche 911 Carrera", "Icono deportivo aleman de alta gama", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800", deportivo, Arrays.asList(bluetooth, automaticTransmission, usbCharger)));
            vehicleRepository.save(createVehicleWithCategory("Mazda CX-5 Signature", "SUV compacto con diseno sofisticado", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Nissan Altima 2023", "Sedan familiar con excelente rendimiento", "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800", sedan, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Hyundai Tucson Limited", "Tecnologia hibrida y diseno moderno", "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=800", suv, Arrays.asList(airConditioning, gps)));
            vehicleRepository.save(createVehicleWithCategory("Kia Sportage EX", "SUV versatil para uso diario", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800", suv, Arrays.asList(bluetooth, usbCharger)));
            vehicleRepository.save(createVehicleWithCategory("Volkswagen Jetta GLI", "Deportividad alemana accesible", "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800", sedan, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Subaru Outback Wilderness", "Aventura con traccion integral permanente", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Lexus RX 350 Luxury", "Lujo japones con confiabilidad", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800", suv, Arrays.asList(airConditioning, bluetooth, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Chevrolet Silverado 1500", "Pickup potente para trabajo y aventura", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800", suv, Arrays.asList(bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Ford F-150 Raptor", "La pickup mas vendida de America", "https://images.unsplash.com/photo-1587228579942-dc77f5c95c1f?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Ram 1500 Laramie", "Comodidad y capacidad de carga", "https://images.unsplash.com/photo-1580414057403-c5f451f30b11?w=800", suv, Arrays.asList(bluetooth, usbCharger)));
            vehicleRepository.save(createVehicleWithCategory("Toyota RAV4 Hybrid", "SUV hibrido economico y espacioso", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Honda CR-V Touring", "Perfecto balance entre espacio y eficiencia", "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Dodge Challenger SRT", "Muscle car moderno con alma clasica", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800", deportivo, Arrays.asList(bluetooth, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Acura MDX A-Spec", "Lujo deportivo japones de 7 plazas", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Genesis G80 Sport", "Elegancia coreana de alta gama", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800", sedan, Arrays.asList(airConditioning, bluetooth, automaticTransmission)));
            vehicleRepository.save(createVehicleWithCategory("Volvo XC90 Inscription", "Seguridad escandinava y lujo", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Mini Cooper S Countryman", "Compacto premium con personalidad", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800", sedan, Arrays.asList(bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Fiat 500X Sport", "Urbano italiano con estilo", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800", sedan, Arrays.asList(bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Mitsubishi Outlander PHEV", "SUV enchufable economico", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800", suv, Arrays.asList(airConditioning, bluetooth)));
            vehicleRepository.save(createVehicleWithCategory("Cadillac Escalade ESV", "SUV de lujo americano full-size", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800", suv, Arrays.asList(airConditioning, gps, bluetooth, automaticTransmission, usbCharger)));

            System.out.println("30 vehicles loaded successfully!");
            System.out.println("3 categories created: Sedan, SUV, Deportivo");
        };
    }

    private Vehicle createVehicleWithCategory(String name, String description, String image, Category category, java.util.List<Feature> features) {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(name);
        vehicle.setDescription(description);
        vehicle.setImage(image);
        vehicle.setCategory(category);
        vehicle.setFeatures(features);
        return vehicle;
    }
}