package com.coding.saga.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.jackson2.SecurityJackson2Modules;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
class Jackson2Test {
    private final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        List<Module> modules = SecurityJackson2Modules.getModules(Jackson2Test.class.getClassLoader());
        mapper.registerModules(modules);
    }

    @Test
    void shouldConvertJsonToMap() throws JsonProcessingException {
        String jsonStr = "{\"@class\": \"java.util.Collections$UnmodifiableMap\",\"require-proof-key\":true,\"require-authorization-consent\":true}";
//        String jsonStr = "{\"require-proof-key\":true,\"require-authorization-consent\":true}";

        Map<String, Object> stringObjectMap = mapper.readValue(jsonStr, Collections.<String, Object>unmodifiableMap(Collections.emptyMap()).getClass());

        Assertions.assertThat(stringObjectMap).isNotNull();
        Assertions.assertThat(stringObjectMap).containsEntry("require-proof-key", true);
    }

}
