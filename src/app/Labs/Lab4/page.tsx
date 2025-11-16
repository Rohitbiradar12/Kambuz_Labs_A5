"use client";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";


export default function Lab4() {
    function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
    <div id="wd-lab4">
      <h1>Lab 4: Maintaining State in React Applications</h1>
      <ClickEvent />
      <PassingDataOnEvent/>
       <PassingFunctions theFunction={sayHello} />
       <EventObject/>
       <Counter/>
       <BooleanStateVariables/>
       <StringStateVariables/>
       <DateStateVariable/>
       <ObjectStateVariable/>
       <ArrayStateVariable/>
       <ParentStateComponent/>
       <ReduxExamples/>
    </div>
    </Provider>
  );
}