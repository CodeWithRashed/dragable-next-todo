import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/todoModels";
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options";
export async function POST(request: NextRequest) {
  try {
    connect();
    //Get Body Data
    const reqBody = await request.json();
    console.log(reqBody);

    //Create New Task
    const newTask = new Task({
      taskName: reqBody.taskName,
      taskStatus: reqBody.taskStatus,
      createdBy: reqBody.createdBy,
    });

    //Saving Task
    const savedTask = await newTask.save();

    //Send Response
    return NextResponse.json({ message: "User Created Successfully" });
  } catch (err: any) {
    console.log("signup error");
    console.log(err);
  }
}


//Get Task
export async function GET(request: NextRequest, response: NextResponse) {
  connect();
  const session = await getServerSession(options)

  const url = request.url;
  const createdUser = url.split("=")[1] 

const todoData = await Task.find({createdBy: createdUser || session?.user?.email})

    return NextResponse.json({todos: todoData});
  }


  //Update Task Status
  // Update Task
export async function PUT(request: NextRequest, response: NextResponse) {
  connect();

  // Get task ID from the URL
  const taskId = request.url.split("?")[1];

  // Extract the new task status from the request body
  const { taskStatus } = await request.json();

  try {
    // Find the task by ID and update the task status
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { taskStatus },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' });
    }

    return NextResponse.json({ updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Task Update Error' });
  }
}