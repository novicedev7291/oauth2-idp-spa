package com.coding.saga.resource.user;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class DefaultUserRepository implements UserRespository {
    private final Map<String, User> usersDb = new HashMap<>();
    @Override
    public Iterable<User> findAll() {
        return List.copyOf(usersDb.values());
    }

    @Override
    public Optional<User> findById(String id) {
        User possible = usersDb.get(id);
        if (possible == null) {
            return Optional.empty();
        }
        return Optional.of(User.copy(possible));
    }

    @Override
    public void save(User user) {
        usersDb.put(user.id(), User.copy(user));
    }

    @Override
    public void update(User user) {
        usersDb.put(user.id(), User.copy(user));
    }

    @Override
    public boolean deleteById(String id) {
        return usersDb.remove(id) != null;
    }
}
