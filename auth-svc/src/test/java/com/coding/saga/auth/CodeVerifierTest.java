package com.coding.saga.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

public class CodeVerifierTest {
    @Test
    void shouldPassBcryptEncPassword() {
        String hashedPass = "$2b$10$XUHqvNpNjsN5AA60LB/oH.CVjHhbQKEUq335sgCa314rtimKlmvSa";
        assertThat(new BCryptPasswordEncoder().matches("P@swd", hashedPass)).isTrue();
    }

    private String codeChallenge(String code) {
        try {
            MessageDigest algo = MessageDigest.getInstance("SHA-256");
            byte[] bytes = algo.digest(code.getBytes(StandardCharsets.US_ASCII));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException(ex);
        }
    }
}
