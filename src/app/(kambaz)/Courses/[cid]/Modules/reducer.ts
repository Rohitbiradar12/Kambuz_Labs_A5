"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
  editing?: boolean;
};

export type ModuleItem = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
};

type ModulesState = {
  modules: ModuleItem[];
};

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload }: PayloadAction<ModuleItem[]>) => {
      state.modules = payload;
    },

    addModule: (
      state,
      { payload }: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: ModuleItem = {
        _id: uuidv4(),
        lessons: [],
        name: payload.name,
        course: payload.course,
        editing: false,
      };
      state.modules = [...state.modules, newModule];
    },

    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },

    updateModule: (state, { payload: module }: PayloadAction<ModuleItem>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },

    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },

    addLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; name: string }>
    ) => {
      const { moduleId, name } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: [
                ...(m.lessons ?? []),
                { _id: uuidv4(), name, module: moduleId, editing: false },
              ],
            }
      );
    },

    startEditLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; lessonId: string }>
    ) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: (m.lessons ?? []).map((l) => ({
                ...l,
                editing: l._id === lessonId,
              })),
            }
      );
    },

    updateLesson: (
      state,
      {
        payload,
      }: PayloadAction<{ moduleId: string; lessonId: string; name: string }>
    ) => {
      const { moduleId, lessonId, name } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: (m.lessons ?? []).map((l) =>
                l._id === lessonId ? { ...l, name } : l
              ),
            }
      );
    },

    finishEditLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; lessonId: string }>
    ) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: (m.lessons ?? []).map((l) =>
                l._id === lessonId ? { ...l, editing: false } : l
              ),
            }
      );
    },

    cancelEditLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; lessonId: string }>
    ) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: (m.lessons ?? []).map((l) =>
                l._id === lessonId ? { ...l, editing: false } : l
              ),
            }
      );
    },

    deleteLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; lessonId: string }>
    ) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((m) =>
        m._id !== moduleId
          ? m
          : {
              ...m,
              lessons: (m.lessons ?? []).filter(
                (l) => l._id !== lessonId
              ),
            }
      );
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
  addLesson,
  startEditLesson,
  updateLesson,
  cancelEditLesson,
  deleteLesson,
  finishEditLesson,
} = modulesSlice.actions;

export default modulesSlice.reducer;
