package com.coding.saga.resource.user;

public record User(String id, String first, String last, String email, String avatar, String roles, long createdAt){

    public User(String id, long createdAt) {
        this(id, null, null, null, null, null, createdAt);
    }
    public static User copy(User user) {
        return new User(
                user.id,
                user.first,
                user.last,
                user.email,
                user.avatar,
                user.roles,
                user.createdAt
        );
    }
};
