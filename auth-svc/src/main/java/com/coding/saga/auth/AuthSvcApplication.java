package com.coding.saga.auth;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@SpringBootApplication
public class AuthSvcApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthSvcApplication.class, args);
	}

	@Bean
	public Flyway flyway(DataSource ds) {
		return Flyway.configure()
				.dataSource(ds)
				.locations("classpath:db/migrations")
				.load();
	}

	@Bean
	public FlywayMigrationInitializer flywayMigrationInit(Flyway flyway) {
		return new FlywayMigrationInitializer(flyway);
	}
}
