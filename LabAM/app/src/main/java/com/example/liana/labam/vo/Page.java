package com.example.liana.labam.vo;

import java.util.List;

public class Page {
    private int number;
    private List<Book> books;

    public int getNumber() {
        return number;
    }

    public List<Book> getBooks() {
        return books;
    }

    @Override
    public String toString() {
        return "Page{" +
                "number=" + number +
                ", books=" + books +
                '}';
    }
}