

const SearchPagination=  async(limit,skip,search,model,filds)=>
{
    let data;
    if(search){
        data=await model.find({
$or:filds.map((e)=>{
    return {[e]:{$regex:search}}
})
        })
    }
    else{
        data=await model.find({}).skip(skip).limit(limit)
        return data
    }








}

module.exports=SearchPagination