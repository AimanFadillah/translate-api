import express from "express"
import translate from "translate"
import fileUpload from "express-fileupload";
import cors from "cors";
import fs from "fs";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

translate.engine = "google"

app.get("/",async (req,res) => {
    const bahasa = JSON.parse(fs.readFileSync("bahasa.json","utf8"));
    const msg = {
        method:"post",
        body_required:["text","language"],
        language:bahasa
    }
    return res.json(msg);
})

app.post("/",async (req,res) => {
    const text = req.body?.text;
    const language = req.body?.language;
    if(!text) return res.status(400).send("text is required");
    if(!language) return res.status(400).send("language is required");
    try{
        const textTranslate = await translate(text,language);
        return res.send(textTranslate);
    }catch(e){
        return res.send("language is wrong");
    }
})

app.listen(5000,() => console.log("Server on"))