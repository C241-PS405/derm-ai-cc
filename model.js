const tfjs = require("@tensorflow/tfjs-node");
const {Firestore} = require("@google-cloud/firestore");
const UserError = require("./clienterror.js");
const crypto = require("crypto");

const db = new Firestore({projectId:"capstoneprojectdermai"});

function loadModel() {
    const modelUrl = "https://storage.googleapis.com/modelmldermai/tfjs/model.json";
    return new Promise(async(resolve,reject) => {
        try {
            const model = await tfjs.loadGraphModel(modelUrl);
            resolve(model);
        } catch (error){
        reject(error);
        }
    });
}
async function getscan(){
    let querySnapshot = await db.collection('scan').get()

    const allDocuments = [];
    querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        documentData.id = doc.id;
        allDocuments.push(documentData);
    });
    
    return allDocuments;
}

async function saveDatatoFirestore(data){
    let scan = db.collection('scan')
    await scan.doc(data.id).set(data)

}
async function analyzeclassification(model,imageBuffer) {
    try {
        const tensor = tfjs.node
        .decodeJpeg(imageBuffer)
        .decodeJpg(imageBuffer)
        .resizeNearestNeighbor([640,640])
        .expandDims()
        .toFloat()

        let resultscan = await model.scan(tensor).data();
        let dataRes = {
            id: crypto.randomUUID(),
            result: resultscan,
            createdAt: new Date(Date.now()),
        };
        saveDatatoFirestore(dataRes)
        return dataRes;
    }    catch (error) {
    throw new UserError("Terjadi Kesalahan dalam melakukan scan", 400);
    }
}

module.exports = {analyzeclassification,loadModel,getscan};
