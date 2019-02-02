package com.example.liana.labam.database;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.Room;
import android.arch.persistence.room.RoomDatabase;
import android.content.Context;

import com.example.liana.labam.vo.Book;
import com.example.liana.labam.vo.User;


@Database(entities = {Book.class, User.class}, version = 1)
public abstract class BookDatabase extends RoomDatabase {
    private static BookDatabase INSTANCE;

    public abstract BookDao getBookDao();
    public abstract UserDao getUserDao();

    public static BookDatabase getBooksDatabase(Context context) {
        if( INSTANCE == null) {
            INSTANCE = Room.databaseBuilder(context, BookDatabase.class, "books.db").build();
        }
        return INSTANCE;
    }
}
