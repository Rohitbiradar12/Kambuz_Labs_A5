"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Course = {
  _id: string;
  number?: string;
  code?: string;
  name?: string;
  title?: string;
  description?: string;
  image: string;
  startDate: string;
  endDate: string;
};

export type CoursesState = {
  courses: Course[];
};


const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {

    addNewCourse: (state, { payload: course }: PayloadAction<Course>) => {
      const newCourse: Course = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },

    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },

    updateCourse: (state, { payload: updated }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === updated._id ? updated : c
      );
    },


    setCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;

export default coursesSlice.reducer;
