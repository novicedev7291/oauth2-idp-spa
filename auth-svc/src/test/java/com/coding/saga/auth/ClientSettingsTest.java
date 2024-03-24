package com.coding.saga.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.jackson2.SecurityJackson2Modules;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.ConfigurationSettingNames;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
class ClientSettingsTest {

    private final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        List<Module> modules = SecurityJackson2Modules.getModules(Jackson2Test.class.getClassLoader());
        mapper.registerModules(modules);
    }

    @Test
    void shouldHaveTrueForRequireAuthorizationConsent() throws JsonProcessingException {
        String clientSettingsStr = "{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.client.require-proof-key\":true,\"settings.client.require-authorization-consent\":true}";

        Map<String, Object> settingsMap = mapper.readValue(clientSettingsStr, Collections.<String, Object>unmodifiableMap(Collections.emptyMap()).getClass());

        ClientSettings clientSettings = ClientSettings.withSettings(settingsMap).build();

        Assertions.assertThat((Boolean) clientSettings.getSetting(ConfigurationSettingNames.Client.REQUIRE_AUTHORIZATION_CONSENT)).isEqualTo(true);
    }
}
