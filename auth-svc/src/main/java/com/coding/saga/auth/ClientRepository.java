package com.coding.saga.auth;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {
    Optional<Client> findByClientId(String clientId);
}
