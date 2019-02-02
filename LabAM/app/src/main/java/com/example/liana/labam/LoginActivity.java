package com.example.liana.labam;

import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import com.example.liana.labam.viewmodel.UserViewModel;
import com.example.liana.labam.vo.User;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = "LoginActivity";
    private EditText usernameTxt;
    private EditText passwordTxt ;
    private UserViewModel userViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        usernameTxt = findViewById(R.id.usernameTxt);
        passwordTxt = findViewById(R.id.passwordTxt);
    }

    public void OnLogin(View view){
        String username = usernameTxt.getText().toString();
        String password = passwordTxt.getText().toString();

        userViewModel = ViewModelProviders.of(this).get(UserViewModel.class);
        userViewModel.login(new User(username, password), LoginActivity.this);


    }

}
