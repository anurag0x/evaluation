const password=(req,res,next)=>{
const pass=req.body.pass

let obj={
    N:true,U:true,L:true,S:true
}
if(pass.length<8){
    return res.status(400).send("Password Must contain 8 characters")
}
for(let i=0;i<pass.length;i++){
    if(pass[i]<="Z" && pass[i]>="A"){
        obj["U"]=false
    }
    if(pass[i]<="z" && pass[i]>="a"){
        obj["L"]=false
    }
    if(pass[i]<=9 && pass[i]>=0){
        obj["N"]=false
    }
    if(pass[i]<="*" && pass[i]>="!"){
        obj["S"]=false
    }
}
for(let i in obj){
    if(obj[i]){
        return res.status(400).send("Password Must contain atleast 1 lowercase 1 uppercase 1 Number and 1 special characters")
    }
}
next()
}
module.exports=password