package com.coding.saga.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
class RawTokenSettings {
    @JsonProperty("authorization-code-time-to-live")
    private Integer authorizationCodeTTL;
    @JsonProperty("access-token-time-to-live")
    private Integer accessTokenTTL;
    @JsonProperty("access-token-format")
    private String accessTokenFmt;

    @JsonProperty("device-code-time-to-live")
    private Integer deviceCodeTTL;
    @JsonProperty("reuse-refresh-tokens")
    private Boolean reuseRefreshTokens;
    @JsonProperty("refresh-token-time-to-live")
    private Integer refreshTokenTTL;
    @JsonProperty("id-token-signature-algorithm")
    private String idTokenSignatureAlgo;

    public Integer getAuthorizationCodeTTL() {
        return authorizationCodeTTL;
    }

    public RawTokenSettings setAuthorizationCodeTTL(Integer authorizationCodeTTL) {
        this.authorizationCodeTTL = authorizationCodeTTL;
        return this;
    }

    public Integer getAccessTokenTTL() {
        return accessTokenTTL;
    }

    public RawTokenSettings setAccessTokenTTL(Integer accessTokenTTL) {
        this.accessTokenTTL = accessTokenTTL;
        return this;
    }

    public String getAccessTokenFmt() {
        return accessTokenFmt;
    }

    public RawTokenSettings setAccessTokenFmt(String accessTokenFmt) {
        this.accessTokenFmt = accessTokenFmt;
        return this;
    }

    public Integer getDeviceCodeTTL() {
        return deviceCodeTTL;
    }

    public RawTokenSettings setDeviceCodeTTL(Integer deviceCodeTTL) {
        this.deviceCodeTTL = deviceCodeTTL;
        return this;
    }

    public Boolean getReuseRefreshTokens() {
        return reuseRefreshTokens;
    }

    public RawTokenSettings setReuseRefreshTokens(Boolean reuseRefreshTokens) {
        this.reuseRefreshTokens = reuseRefreshTokens;
        return this;
    }

    public Integer getRefreshTokenTTL() {
        return refreshTokenTTL;
    }

    public RawTokenSettings setRefreshTokenTTL(Integer refreshTokenTTL) {
        this.refreshTokenTTL = refreshTokenTTL;
        return this;
    }

    public String getIdTokenSignatureAlgo() {
        return idTokenSignatureAlgo;
    }

    public RawTokenSettings setIdTokenSignatureAlgo(String idTokenSignatureAlgo) {
        this.idTokenSignatureAlgo = idTokenSignatureAlgo;
        return this;
    }
}
