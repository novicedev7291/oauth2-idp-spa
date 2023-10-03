package com.coding.saga.resource.user;

import java.util.Optional;

public interface UserRespository {
    Iterable<User> findAll();

    Optional<User> findById(String id);

    void save(User user);

    void update(User user);

    boolean deleteById(String id);
}
