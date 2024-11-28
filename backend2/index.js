import express from 'express'
import mongoose from 'mongoose';
import { message } from './models/message.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json({
        message : 'hello'
    })
})
app.get('/messages/:id',async (req ,res )=>{
  const id = req.params.id;
  try {
      const messages = await message.find({to : id});
      return res.status(201).json({
        success : true,
        messages
      })
      
  } catch (error) {
    console.log(error);
    return res.status(401).json({
        success : false,
        message : 'unable to get messages'
    })
  }
})

app.post('/messages',async (req,res )=>{
    const {from,to,title,description} = req.body;
    
    try {
        await message.create({from,to,title,description});
        return res.status(201).json({
            success : true,
            message : 'message posted successfully'
          })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'unable to post message'
        })
    }
})
app.get('/messages',async (req,res)=>{
    const messages = await message.find();
    res.json(messages);
})


const startServer = async()=>{
    const res = await mongoose.connect('mongodb://localhost:27017/annomousMessage')
    if(res) console.log(`mongo db connected successfully`);
    app.listen(PORT,()=>{
        console.log(`App listining on port ${PORT}`);
    })
}
startServer();