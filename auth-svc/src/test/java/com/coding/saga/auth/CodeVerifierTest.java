package com.coding.saga.auth;

import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

public class CodeVerifierTest {

    @Test
    void shouldPass() {
        String code = "aSNWtEKC46qaQ9yqT705d0g2VhlU51W6GEQXFmnm";
        String expected = "W29iamVjdCBQcm9taXNlXQ";

        assertThat(codeChallenge(code)).isEqualTo(expected);
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
