"use client";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import { DndContext } from "@/AuthContext/DndContext";
import { cardsData } from "@/app/data/cardsData";

// Updated task structure
interface Task {
  _id: string;
  taskName: string;
  taskStatus: string;
  createdBy: string;
}

const DndTodo = () => {
  const [data, setData] = useState<{ [key: string]: Task[] }>({
    TODO: [],
    INPROGRESS: [],
    COMPLETED: [],
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    let targetedTaskCategory: string;
    let taskDestination: string;
    
    if (!destination) return;
  
    setData((prevState) => {
      const newData = { ...prevState };
  
      // Extract status from droppableId
      const sourceStatus = source.droppableId.split("droppable")[1];
      const destinationStatus = destination.droppableId.split("droppable")[1];
  
      if (sourceStatus === "0") {
        targetedTaskCategory = "TODO";
      } else if (sourceStatus === "1") {
        targetedTaskCategory = "INPROGRESS";
      } else if (sourceStatus === "2") {
        targetedTaskCategory = "COMPLETED";
      }
  
      if (!targetedTaskCategory) {
        return prevState;
      }
  
      const draggedTaskIndex = newData[targetedTaskCategory]?.findIndex(
        (task) => task._id === draggableId
      );
  
      if (draggedTaskIndex === -1) {
        return prevState;
      }
  
      const [draggedTask] = newData[targetedTaskCategory].splice(draggedTaskIndex, 1);
  
      // Set the task status based on the destination index
      if (destinationStatus === "0") {
        draggedTask.taskStatus = "TODO";
        taskDestination = "TODO";
      } else if (destinationStatus === "1") {
        draggedTask.taskStatus = "INPROGRESS";
        taskDestination = "INPROGRESS";
      } else if (destinationStatus === "2") {
        draggedTask.taskStatus = "COMPLETED";
        taskDestination = "COMPLETED";
      }
  
      // Add the dragged task to the destination array
      newData[taskDestination] = [
        ...(newData[taskDestination] || []),
        draggedTask,
      ];
  
      return newData;
    });
  };
  
  useEffect(() => {
    // Initialize an object to store tasks by status
    const groupedData: { [key: string]: Task[] } = {};

    // Filter tasks by status and push them to the corresponding arrays
    cardsData.forEach((task) => {
      const { taskStatus } = task;

      if (!groupedData[taskStatus]) {
        groupedData[taskStatus] = [];
      }

      groupedData[taskStatus].push(task);
    });

    // Set the filtered and grouped data to the state
    setData({
      TODO: groupedData["TODO"] || [],
      INPROGRESS: groupedData["INPROGRESS"] || [],
      COMPLETED: groupedData["COMPLETED"] || [],
    });
  }, []);

  if (Object.keys(data).length === 0) {
    return <FaSpinner className="animate-spin" />;
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">
        Drag and Drop Application
      </h1>
      <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
        {["TODO", "INPROGRESS", "COMPLETED"].map((status, index) => (
          <Droppable key={index} droppableId={`droppable${index}`}>
            {(provided: any) => (
              <div
                className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-center font-bold mb-6 text-black">
                  {status}
                </h2>
                {(data[status] || []).map((task: Task, taskIndex: number) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={taskIndex}
                  >
                    {(provided: any) => (
                      <div
                        className="bg-gray-200 mx-1 px-4 py-3 my-3"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        {task.taskName}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default DndTodo;
