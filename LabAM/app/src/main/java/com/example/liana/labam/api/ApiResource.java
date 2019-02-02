package com.example.liana.labam.api;

import com.example.liana.labam.vo.Book;
import com.example.liana.labam.vo.LoginResponse;
import com.example.liana.labam.vo.Page;
import com.example.liana.labam.vo.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiResource {
    String BASE_URL = "http://192.168.137.1:3001/";

    @GET("books")
    Call<Page> getBooks();

    @POST("login")
    Call<LoginResponse> login (@Body User user);//(@Field("username") String username, @Field("password") String password);

    @POST("books")
    Call<Page> addBook(@Body Book book);
}
