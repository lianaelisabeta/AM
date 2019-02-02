package com.example.liana.labam.ui;

import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.liana.labam.R;
import com.example.liana.labam.viewmodel.BooksViewModel;


public class BookListFragment extends Fragment {

    private BooksViewModel mBooksViewModel;
    private RecyclerView mBookList;

    public static BookListFragment newInstance() {
        return new BookListFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.books_list_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mBookList = view.findViewById(R.id.books_list);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mBookList.setLayoutManager(new LinearLayoutManager(getActivity()));
        mBooksViewModel = ViewModelProviders.of(this).get(BooksViewModel.class);
        mBooksViewModel.getBooks(getContext()).observe(this, songs -> {
            BookListAdapter songsAdapter = new BookListAdapter(getActivity(), songs);
            mBookList.setAdapter(songsAdapter);
        });

    }

}
