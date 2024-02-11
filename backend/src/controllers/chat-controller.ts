import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import OpenAI from "openai";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).json({message:"User not registered OR Token malfunctioned"});
        // grab chats of user for context
        //chatcompletionrequestmessage gets rid of type error
        // Specify the type for the messages array
        const messages: { role: string; content: string }[] = [
            ...user.chats.map(({ role, content }) => ({ role, content })),
            { content: message, role: "user" },
        ];

        // send all chats with the new one to OpenAI API
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET, });

        // chat completion response
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }],
        });

        user.chats.push({
            role: "assistant",
            content: chatCompletion.choices[0].message.content,
        });
            // save the user
            await user.save();
            return res.status(200).json({ chats: user.chats});

    } catch (error) {
            return res.status(500).json({ message: "Something went wrong..."});
        };      
};

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };