package com.coding.saga.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepo;
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user find with username " + username));
        return new OAuth2UserDetails()
                .username(user.getUsername())
                .password(user.getPassword())
                .setAuthorities(Collections.singletonList(new SimpleGrantedAuthority("RES_USER")))
                .setEnabled(true)
                .setAccountNonExpired(true)
                .setAccountNonLocked(true)
                .setCredentialsNonExpired(true);
    }
}
