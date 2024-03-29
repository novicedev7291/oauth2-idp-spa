insert into client(
    id,
    client_id,
    client_secret,
    client_id_issued_at,
    client_name,
    client_authentication_methods,
    authorization_grant_types,
    redirect_uris,
    scopes,
    client_settings,
    token_settings
    ) values (
        "fbf7e58cc6da3030cf628198012584f617914167aeb0e68bf6d0de61488f08ae",
        "public-web-client",
        "{noop}secret",
        now(),
        "public-web-client",
        "none",
        "authorization_code",
        "http://localhost:5173/oauth2/callback",
        "openid,profile",
        -- @class attribute required here, bcoz objectMapper used in deserialization expects the subtype info due to used mixin - see JpaRegisteredClientRepository Impl objectMapper init & CoreJackson2Module registered on same objectMapper
        "{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.client.require-proof-key\":true,\"settings.client.require-authorization-consent\":true}",
        "{\"@class\":\"com.coding.saga.auth.RawTokenSettings\",\"authorization-code-time-to-live\":5,\"access-token-time-to-live\":5,\"access-token-format\":\"self-contained\",\"device-code-time-to-live\":5,\"reuse-refresh-tokens\":true,\"refresh-token-time-to-live\":60,\"id-token-signature-algorithm\":\"RS256\"}"
    );

insert into users(username, password) values("kuldeep", "{bcrypt}$2b$10$XUHqvNpNjsN5AA60LB/oH.CVjHhbQKEUq335sgCa314rtimKlmvSa");


