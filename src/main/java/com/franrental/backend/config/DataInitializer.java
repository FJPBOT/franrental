package com.franrental.backend.config;

import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(VehicleRepository vehicleRepository) {
        return args -> {
            List<Vehicle> vehicles = Arrays.asList(
                    new Vehicle(null, "Toyota Corolla 2023", "Sedan compacto, ideal para ciudad y carretera", "Sedan", "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800"),
                    new Vehicle(null, "Honda Civic 2024", "Deportivo y elegante, perfecto para viajes largos", "Sedan", "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800"),
                    new Vehicle(null, "Ford Mustang GT", "Potencia y estilo americano clasico", "Deportivo", "https://images.unsplash.com/photo-1584345604476-8ec5f5ea8cda?w=800"),
                    new Vehicle(null, "Chevrolet Camaro SS", "Muscle car con motor V8 de alto rendimiento", "Deportivo", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"),
                    new Vehicle(null, "Tesla Model 3", "Vehiculo electrico con autopilot avanzado", "Sedan", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"),
                    new Vehicle(null, "BMW X5 2023", "SUV de lujo con tecnologia de punta", "SUV", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"),
                    new Vehicle(null, "Mercedes-Benz GLE", "Confort y elegancia en cada viaje", "SUV", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"),
                    new Vehicle(null, "Audi Q7 Premium", "Espacio y tecnologia para toda la familia", "SUV", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"),
                    new Vehicle(null, "Jeep Wrangler Rubicon", "Aventura extrema en cualquier terreno", "SUV", "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"),
                    new Vehicle(null, "Porsche 911 Carrera", "Icono deportivo aleman de alta gama", "Deportivo", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"),
                    new Vehicle(null, "Mazda CX-5 Signature", "SUV compacto con diseno sofisticado", "SUV", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"),
                    new Vehicle(null, "Nissan Altima 2023", "Sedan familiar con excelente rendimiento", "Sedan", "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800"),
                    new Vehicle(null, "Hyundai Tucson Limited", "Tecnologia hibrida y diseno moderno", "SUV", "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=800"),
                    new Vehicle(null, "Kia Sportage EX", "SUV versatil para uso diario", "SUV", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"),
                    new Vehicle(null, "Volkswagen Jetta GLI", "Deportividad alemana accesible", "Sedan", "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800"),
                    new Vehicle(null, "Subaru Outback Wilderness", "Aventura con traccion integral permanente", "SUV", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"),
                    new Vehicle(null, "Lexus RX 350 Luxury", "Lujo japones con confiabilidad", "SUV", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"),
                    new Vehicle(null, "Chevrolet Silverado 1500", "Pickup potente para trabajo y aventura", "Pickup", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"),
                    new Vehicle(null, "Ford F-150 Raptor", "La pickup mas vendida de America", "Pickup", "https://images.unsplash.com/photo-1587228579942-dc77f5c95c1f?w=800"),
                    new Vehicle(null, "Ram 1500 Laramie", "Comodidad y capacidad de carga", "Pickup", "https://images.unsplash.com/photo-1580414057403-c5f451f30b11?w=800"),
                    new Vehicle(null, "Toyota RAV4 Hybrid", "SUV hibrido economico y espacioso", "SUV", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"),
                    new Vehicle(null, "Honda CR-V Touring", "Perfecto balance entre espacio y eficiencia", "SUV", "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800"),
                    new Vehicle(null, "Dodge Challenger SRT", "Muscle car moderno con alma clasica", "Deportivo", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"),
                    new Vehicle(null, "Acura MDX A-Spec", "Lujo deportivo japones de 7 plazas", "SUV", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"),
                    new Vehicle(null, "Genesis G80 Sport", "Elegancia coreana de alta gama", "Sedan", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"),
                    new Vehicle(null, "Volvo XC90 Inscription", "Seguridad escandinava y lujo", "SUV", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"),
                    new Vehicle(null, "Mini Cooper S Countryman", "Compacto premium con personalidad", "Compacto", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"),
                    new Vehicle(null, "Fiat 500X Sport", "Urbano italiano con estilo", "Compacto", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"),
                    new Vehicle(null, "Mitsubishi Outlander PHEV", "SUV enchufable economico", "SUV", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"),
                    new Vehicle(null, "Cadillac Escalade ESV", "SUV de lujo americano full-size", "SUV", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800")
            );

            vehicleRepository.saveAll(vehicles);
            System.out.println("✅ 30 vehicles loaded successfully!");
        };
    }
}