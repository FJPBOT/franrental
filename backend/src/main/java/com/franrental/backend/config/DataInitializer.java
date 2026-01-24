package com.franrental.backend.config;

import com.franrental.backend.model.Vehicle;
import com.franrental.backend.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(VehicleRepository vehicleRepository) {
        return args -> {
            vehicleRepository.save(createVehicle("Toyota Corolla 2023", "Sedan compacto, ideal para ciudad y carretera", "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800"));
            vehicleRepository.save(createVehicle("Honda Civic 2024", "Deportivo y elegante, perfecto para viajes largos", "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800"));
            vehicleRepository.save(createVehicle("Ford Mustang GT", "Potencia y estilo americano clasico", "https://images.unsplash.com/photo-1584345604476-8ec5f5ea8cda?w=800"));
            vehicleRepository.save(createVehicle("Chevrolet Camaro SS", "Muscle car con motor V8 de alto rendimiento", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"));
            vehicleRepository.save(createVehicle("Tesla Model 3", "Vehiculo electrico con autopilot avanzado", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"));
            vehicleRepository.save(createVehicle("BMW X5 2023", "SUV de lujo con tecnologia de punta", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"));
            vehicleRepository.save(createVehicle("Mercedes-Benz GLE", "Confort y elegancia en cada viaje", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"));
            vehicleRepository.save(createVehicle("Audi Q7 Premium", "Espacio y tecnologia para toda la familia", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"));
            vehicleRepository.save(createVehicle("Jeep Wrangler Rubicon", "Aventura extrema en cualquier terreno", "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"));
            vehicleRepository.save(createVehicle("Porsche 911 Carrera", "Icono deportivo aleman de alta gama", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"));
            vehicleRepository.save(createVehicle("Mazda CX-5 Signature", "SUV compacto con diseno sofisticado", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"));
            vehicleRepository.save(createVehicle("Nissan Altima 2023", "Sedan familiar con excelente rendimiento", "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800"));
            vehicleRepository.save(createVehicle("Hyundai Tucson Limited", "Tecnologia hibrida y diseno moderno", "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=800"));
            vehicleRepository.save(createVehicle("Kia Sportage EX", "SUV versatil para uso diario", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"));
            vehicleRepository.save(createVehicle("Volkswagen Jetta GLI", "Deportividad alemana accesible", "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800"));
            vehicleRepository.save(createVehicle("Subaru Outback Wilderness", "Aventura con traccion integral permanente", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"));
            vehicleRepository.save(createVehicle("Lexus RX 350 Luxury", "Lujo japones con confiabilidad", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"));
            vehicleRepository.save(createVehicle("Chevrolet Silverado 1500", "Pickup potente para trabajo y aventura", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"));
            vehicleRepository.save(createVehicle("Ford F-150 Raptor", "La pickup mas vendida de America", "https://images.unsplash.com/photo-1587228579942-dc77f5c95c1f?w=800"));
            vehicleRepository.save(createVehicle("Ram 1500 Laramie", "Comodidad y capacidad de carga", "https://images.unsplash.com/photo-1580414057403-c5f451f30b11?w=800"));
            vehicleRepository.save(createVehicle("Toyota RAV4 Hybrid", "SUV hibrido economico y espacioso", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"));
            vehicleRepository.save(createVehicle("Honda CR-V Touring", "Perfecto balance entre espacio y eficiencia", "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800"));
            vehicleRepository.save(createVehicle("Dodge Challenger SRT", "Muscle car moderno con alma clasica", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"));
            vehicleRepository.save(createVehicle("Acura MDX A-Spec", "Lujo deportivo japones de 7 plazas", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"));
            vehicleRepository.save(createVehicle("Genesis G80 Sport", "Elegancia coreana de alta gama", "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"));
            vehicleRepository.save(createVehicle("Volvo XC90 Inscription", "Seguridad escandinava y lujo", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"));
            vehicleRepository.save(createVehicle("Mini Cooper S Countryman", "Compacto premium con personalidad", "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"));
            vehicleRepository.save(createVehicle("Fiat 500X Sport", "Urbano italiano con estilo", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"));
            vehicleRepository.save(createVehicle("Mitsubishi Outlander PHEV", "SUV enchufable economico", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"));
            vehicleRepository.save(createVehicle("Cadillac Escalade ESV", "SUV de lujo americano full-size", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"));

            System.out.println("30 vehicles loaded successfully!");
        };
    }

    private Vehicle createVehicle(String name, String description, String image) {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(name);
        vehicle.setDescription(description);
        vehicle.setImage(image);
        vehicle.setCategory(null);
        vehicle.setFeatures(new ArrayList<>());
        return vehicle;
    }
}