import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/todoModels";
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
    console.log(request)
    return NextResponse.json(
      { success: "Response From API Server" },
      { status: 200 }
    );
  }