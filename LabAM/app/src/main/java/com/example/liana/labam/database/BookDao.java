package com.example.liana.labam.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import com.example.liana.labam.vo.Book;

import java.util.List;


@Dao
public interface BookDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void save(List<Book> books);

    @Query("SELECT * FROM book")
    List<Book> load();
}
