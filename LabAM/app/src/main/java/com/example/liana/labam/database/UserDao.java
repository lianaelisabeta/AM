package com.example.liana.labam.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;
import com.example.liana.labam.vo.User;

import java.util.List;

@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE username LIKE :username AND password LIKE :password")
    List<User> findUser(String username, String password);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void addUser(User user);
}
