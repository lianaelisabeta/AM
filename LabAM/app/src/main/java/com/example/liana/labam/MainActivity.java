package com.example.liana.labam;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.liana.labam.database.TokenDatabase;

import com.example.liana.labam.ui.BookListFragment;

public class MainActivity extends AppCompatActivity {
    TokenDatabase tokenDb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, BookListFragment.newInstance())
                    .commitNow();
        }
    }

    public void onLogout(View view){
        tokenDb = TokenDatabase.getInstance(MainActivity.this);
        tokenDb.deleteToken();
        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        MainActivity.this.startActivity(intent);
    }

}
