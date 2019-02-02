package com.example.liana.labam.viewmodel;

import android.app.AlertDialog;
import android.arch.lifecycle.ViewModel;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;

import com.example.liana.labam.LoginActivity;
import com.example.liana.labam.MainActivity;
import com.example.liana.labam.api.ApiResource;
import com.example.liana.labam.database.BookDatabase;
import com.example.liana.labam.database.TokenDatabase;
import com.example.liana.labam.database.UserDao;
import com.example.liana.labam.database.DbExecutor;
import com.example.liana.labam.vo.LoginResponse;
import com.example.liana.labam.vo.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Executor;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserViewModel extends ViewModel {
    private static final String TAG = UserViewModel.class.getCanonicalName();

    private static Retrofit retrofit = null;
    private TokenDatabase tokenDb;
    private UserDao userDao;
    private List<User> userList = new ArrayList<>();
    private User user;
    private Executor executor;

    public void login(final User user, final LoginActivity loginActivity) {
        tokenDb = TokenDatabase.getInstance(loginActivity);
        retrofit = new Retrofit.Builder()
                .baseUrl(ApiResource.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        ApiResource api = retrofit.create(ApiResource.class);

        Call<LoginResponse> call = api.login(user);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {

                    if (Objects.nonNull(response.body().getAccessToken())) {
                        tokenDb.insertToken(response.body().getAccessToken());
                    }


                    BookDatabase bookDatabase = BookDatabase.getBooksDatabase(loginActivity);
                    userDao = bookDatabase.getUserDao();
                    executor = DbExecutor.getExecutor();
                    executor.execute(() -> userDao.addUser(user));
                    Intent intent = new Intent(loginActivity, MainActivity.class);
                    intent.putExtra("username", user.getUsername());
                    loginActivity.startActivity(intent);
                } else {
                    AlertDialog.Builder builder = new AlertDialog.Builder(loginActivity);
                    builder.setMessage("Login Failed.")
                            .create().show();
                }

            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                BookDatabase bookDatabase = BookDatabase.getBooksDatabase(loginActivity);
                userDao = bookDatabase.getUserDao();
                executor = DbExecutor.getExecutor();
                executor.execute(() -> {

                    userList = userDao.findUser(user.getUsername(), user.getPassword());

                    if (userList.size() > 0) {
                        if (userList.get(0).getUsername().equals(user.getUsername())) {
                            Intent intent = new Intent(loginActivity, MainActivity.class);
                            intent.putExtra("username", user.getUsername());
                            loginActivity.startActivity(intent);
                        }

                    } else {
                        Handler hand = new Handler(Looper.getMainLooper());
                        hand.post(() -> {
                            AlertDialog.Builder builder = new AlertDialog.Builder(loginActivity);
                            builder.setMessage("Inexistent user.")
                                    .create()
                                    .show();
                        });
                    }
                });
            }
        });
    }

}
