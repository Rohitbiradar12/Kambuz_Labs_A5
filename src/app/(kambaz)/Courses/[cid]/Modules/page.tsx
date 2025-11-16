"use client";

import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./LessonControlButtons";

import {
  setModules,
  addModule, 
  editModule,
  updateModule,  
  addLesson,
  startEditLesson,
  updateLesson,
  deleteLesson,
  cancelEditLesson,
  finishEditLesson,
} from "./reducer";
import type { RootState } from "../../../store";
import * as client from "../../client";

type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
  editing?: boolean;
};

type ModuleItem = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
};

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState<string>("");

  const [addingFor, setAddingFor] = useState<string | null>(null);
  const [newLessonName, setNewLessonName] = useState("");

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();

  const canManage =
    !!currentUser &&
    (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");


  const fetchModules = async () => {
    if (!cid) return;
    const serverModules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(serverModules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!canManage) return;
    if (!cid || !moduleName.trim()) return;

    const payload = { name: moduleName.trim() };
    const module = await client.createModuleForCourse(String(cid), payload);
    dispatch(setModules([...modules, module]));
    setModuleName("");
  };


  const onRemoveModule = async (moduleId: string) => {
    if (!canManage) return;
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
  };


  const onUpdateModule = async (module: ModuleItem) => {
    if (!canManage) return;
    await client.updateModule(module);
    const newModules = modules.map((m) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  const openAddLesson = (moduleId: string) => {
    if (!canManage) return;
    setAddingFor(moduleId);
    setNewLessonName("");
  };

  const submitAddLesson = (moduleId: string) => {
    if (!canManage || !newLessonName.trim()) return;
    dispatch(addLesson({ moduleId, name: newLessonName.trim() }));
    setNewLessonName("");
    setAddingFor(null);
  };

  return (
    <div>
      <ModulesControls
        canManageAdd={canManage}
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />

      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: ModuleItem) => (
          <ListGroupItem
            key={module._id ?? module.name}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing || !canManage ? (
                  module.name
                ) : (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              {canManage && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                  onAddLesson={openAddLesson}
                />
              )}
            </div>

            {canManage && addingFor === module._id && (
              <div className="p-3 bg-white">
                <FormControl
                  placeholder="New lesson name"
                  value={newLessonName}
                  onChange={(e) => setNewLessonName(e.target.value)}
                  className="mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitAddLesson(module._id);
                  }}
                />
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => submitAddLesson(module._id)}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setAddingFor(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id ?? lesson.name}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <div className="flex-grow-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {!lesson.editing || !canManage ? (
                        lesson.name
                      ) : (
                        <FormControl
                          className="d-inline-block"
                          style={{ maxWidth: 420 }}
                          value={lesson.name}
                          onChange={(e) =>
                            dispatch(
                              updateLesson({
                                moduleId: module._id,
                                lessonId: lesson._id,
                                name: e.target.value,
                              })
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(
                                finishEditLesson({
                                  moduleId: module._id,
                                  lessonId: lesson._id,
                                })
                              );
                            } else if (e.key === "Escape") {
                              dispatch(
                                cancelEditLesson({
                                  moduleId: module._id,
                                  lessonId: lesson._id,
                                })
                              );
                            }
                          }}
                          autoFocus
                        />
                      )}
                    </div>

                    {canManage && (
                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="link"
                          className="text-dark p-0 border-0"
                        >
                          <span className="fs-4 lh-1">⋮</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch(
                                startEditLesson({
                                  moduleId: module._id,
                                  lessonId: lesson._id,
                                })
                              );
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch(
                                deleteLesson({
                                  moduleId: module._id,
                                  lessonId: lesson._id,
                                })
                              );
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
