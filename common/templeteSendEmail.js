const sendEmailTemp=(message,name)=>{
return `     
<h1 style="background-color:#4cb96b;padding:20px ;" align="center">
Hello ${name}
</h1>
<div style="background-color:grey;padding:40px ; font-size:30px; font-weight:bold "align="center" >

${message}

</div>

`
} 
module.exports=sendEmailTemp;