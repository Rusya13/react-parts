import React from "react";
import { Upload, Button } from "../dist";

//let mammoth = require("mammoth");
//
//import Docxtemplater from 'docxtemplater';
//import {saveAs} from 'file-saver';
//import JSZip from 'jszip';

export class UploadController extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            buffer:null
        }
    }


    onChange=(file)=>{
        console.log("UploadController onChange", file);
        let frmData = new FormData();
        frmData.append('file', file);
        console.log("FormData", frmData);

        let reader = new FileReader();
        reader.onload = ( e )=> {
            let arrayBuffer = e.target.result;
            console.log("File onload", arrayBuffer);
            this.arrayBufferParser(arrayBuffer)
        };
        reader.readAsArrayBuffer(file)

    };


    arrayBufferParser(arrayBuffer){

        //let zip = new JSZip(arrayBuffer);
        //
        //let doc = new Docxtemplater();
        //doc.loadZip(zip);
        //
        //doc.setData({
        //    passport:"715544889",
        //    "products": [
        //        { name :"Windows", price: 100},
        //        { name :"Mac OSX", price: 200},
        //        { name :"Ubuntu", price: 0}
        //    ]
        //});
        //console.log("PrintForm openFile", doc);
        //try {
        //    let rendered = doc.render();
        //    this.setState({buffer:rendered});
        //    let buf = doc.getZip().generate({type: 'arrayBuffer'});
        //    console.log("PrintForm openFile rendered", buf);
        //    mammoth.convertToHtml({arrayBuffer:buf})
        //    .then(function(result){
        //        let html = result.value; // The generated HTML
        //        let messages = result.messages; // Any messages, such as warnings during conversion
        //        console.log("Upload mammoth ",html );
        //        console.log("Upload mammoth messages", messages );
        //        let newWin = window.open("about:blank", "hello", "width=200,height=200");
        //        newWin.document.write(html);
        //    })
        //    .done();
        //
        //
        //} catch (e){
        //    console.log("PrintForm openFile catch", e);
        //}





    }

    download=()=>{
        //let doc = this.state.buffer;
        //let outputFile = doc.getZip().generate({
        //    type:"blob"
        //});
        //
        //if (doc){
        //    saveAs(outputFile, "testFile.docx")
        //}

    };


    render(){
        return(
            <div>
                <Upload
                    onChange={this.onChange}
                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
                {(this.state.buffer)?<Button caption="Download" onClick={this.download}/>:null}
            </div>

        )
    }

}