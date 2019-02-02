package com.example.liana.labam.viewmodel;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;
import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;

import com.example.liana.labam.api.ApiResource;
import com.example.liana.labam.database.BookDao;
import com.example.liana.labam.database.BookDatabase;
import com.example.liana.labam.database.DbExecutor;
import com.example.liana.labam.vo.Book;
import com.example.liana.labam.vo.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static retrofit2.Retrofit.*;

public class BooksViewModel extends ViewModel {
    private static final String TAG = BooksViewModel.class.getCanonicalName();
    private MutableLiveData<List<Book>> books;
    private List<Book> bookList = new ArrayList<>();
    private BookDao bookDao;
    private Executor executor;

    public LiveData<List<Book>> getBooks(Context context) {
        BookDatabase bookDatabase = BookDatabase.getBooksDatabase(context);
        this.bookDao = bookDatabase.getBookDao();
        this.executor = DbExecutor.getExecutor();
        executor.execute(() -> bookList.addAll(bookDao.load()));
        if (books == null) {
            books = new MutableLiveData<>();
            loadBooks();
        }
        return books;
    }

    private void loadBooks() {
        Retrofit retrofit = new Builder()
                .baseUrl(ApiResource.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        ApiResource api = retrofit.create(ApiResource.class);
        Call<Page> call = api.getBooks();
        Log.d(TAG, "in loadBooks");
        call.enqueue(new Callback<Page>() {
            @Override
            public void onResponse(@NonNull Call<Page> call, @NonNull Response<Page> response) {
                Log.d(TAG, "in loadBooks success");
               // books.setValue(response.body().getBooks());
               // executor.execute(() -> bookDao.save(response.body().getBooks()));
            }

            @Override
            public void onFailure(@NonNull Call<Page> call, @NonNull Throwable t) {
                Log.e(TAG, "in loadBooks error", t);
            }
        });
    }
}

