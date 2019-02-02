package com.example.liana.labam.database;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class DbExecutor {
    private static Executor executor;
    public static Executor getExecutor() {
        if(executor == null) {
            executor = Executors.newSingleThreadExecutor();
        }
        return executor;
    }
}
