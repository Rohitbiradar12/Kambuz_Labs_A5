"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = { user: string; course: string };

type State = {
  enrollments: Enrollment[];
};

const initialState: State = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) state.enrollments.push(payload);
    },
    unenroll: (state, { payload }: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
