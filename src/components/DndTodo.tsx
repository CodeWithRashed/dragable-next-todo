"use client";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from "@/AuthContext/DndContext";
import { cardsData } from "@/app/data/cardsData";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

// Updated task structure
interface Task {
  _id: string;
  taskName: string;
  taskStatus: string;
  createdBy: string;
}

const DndTodo = () => {
  const [isNewTask, setIsNewTask] = useState(5)
  const { data: session } = useSession();
  const [pending, setPending] = useState(false)
  const [todo, setTodo]=useState("")
  const [data, setData] = useState<{ [key: string]: Task[] }>({
    TODO: [],
    INPROGRESS: [],
    COMPLETED: [],
  });

  //Handle Drag and Drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    let targetedTaskCategory: string;
    let taskDestination: string;

    if (!destination) return;

    setData((prevState) => {
      const newData = { ...prevState };

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

      const [draggedTask] = newData[targetedTaskCategory].splice(
        draggedTaskIndex,
        1
      );

//Update Task
const updateTaskStatus = async (taskId:any, newStatus:any) => {
  try {
    // Make a PUT or PATCH request to update the task status
    await axios.put(`/api/todo?${taskId}`, { taskStatus: newStatus });
    console.log("Task status updated successfully!");
  } catch (error) {
    console.error("Error updating task status:", error);
    // Handle the error, e.g., show a notification to the user
  }
};


      if (destinationStatus === "0") {
        draggedTask.taskStatus = "TODO";
        taskDestination = "TODO";
        toast.success('Status Updated!')
      } else if (destinationStatus === "1") {
        draggedTask.taskStatus = "INPROGRESS";
        taskDestination = "INPROGRESS";
        toast.success('Status Updated!')
      } else if (destinationStatus === "2") {
        draggedTask.taskStatus = "COMPLETED";
        taskDestination = "COMPLETED";
        toast.success('Status Updated!')
      }
      updateTaskStatus(draggedTask._id, draggedTask.taskStatus)

      newData[taskDestination] = [
        ...(newData[taskDestination] || []),
        draggedTask,
      ];
      return newData;
    });
  };

  //Handle Create New Task
  const createTask = async () => {
    const uniqueValue = parseInt(Math.random().toString(36).substring(2) + Date.now());
    setPending(true)
    setIsNewTask(uniqueValue)
    const newTask = {
      taskName: todo,
      taskStatus: "TODO",
      createdBy: session?.user?.email,
    };
try {
  
  const res = await axios.post("/api/todo", newTask)
  toast.success('Task Created Successfully !')
} finally{
  setPending(false)
  setTodo("")
}



  };
  useEffect(() => {
    const getTodo = async () => {
      try {
        const todoData = await axios.get(`/api/todo?email=${session?.user?.email}`);
  
        const groupedData: { [key: string]: Task[] } = {};
  
        todoData?.data?.todos?.forEach((task: any) => {
          const { taskStatus } = task;
  
          if (!groupedData[taskStatus]) {
            groupedData[taskStatus] = [];
          }
  
          groupedData[taskStatus].push(task);
        });
  
        setData({
          TODO: groupedData["TODO"] || [],
          INPROGRESS: groupedData["INPROGRESS"] || [],
          COMPLETED: groupedData["COMPLETED"] || [],
        });
      } catch (error) {
        console.error("Error fetching todo data:", error);
      }
    };
  
    getTodo();
  }, [isNewTask, pending, session?.user?.email]);;
  

  if (Object.keys(data).length === 0) {
    return <FaSpinner className="animate-spin" />;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="create-todo flex justify-center items-center mt-5">
          <input
            type="text"
            
            value={todo}
            onChange={(e)=>{
              setTodo(e.target.value)
            }}
            className="border-2 w-1/2 border-btn-primary-bg outline-none h-10 px-2 rounded-l"
          />
          <button
            onClick={createTask}
            className="bg-btn-primary-bg px-2 py-1 text-white font-bold rounded-r  h-10"
          >
            {pending ? "Adding.." : "Add Todo"}
            
          </button>
        </div>
      </div>
      <div className="max-w-[1240px] px-5 mx-auto">
        {cardsData?.length ? (
          <DndContext onDragEnd={onDragEnd}>
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
                      {(data[status] || []).map(
                        (task: Task, taskIndex: number) => (
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
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DndContext>
        ) : (
          <p>NO DATA AVAILABLE</p>
        )}
      </div>
    </div>
  );
};

export default DndTodo;
