const { roles } = require("../../../common/auth");
const pagination = require("../../../common/pag");
const SearchPagination = require("../../../common/paginationAndSearch");
const user = require("../../user/model/user.model");

const posts = require("../model/post.model");


const creatpost = async (req, res) => {
    try {
        if (req.user.blocked == false && req.user.deactivated == false) {
            const { title, desc } = req.body;
            const newPost = new posts({ title, desc, createdBy: req.user._id })
            const savedPost = await newPost.save()
            res.json({ message: "created", post: newPost })
        }
        else {
            res.json({ message: "you are blocked or deactivat your account" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}

const editpost = async (req, res) => {
    try {
        if (req.user.blocked == false && req.user.deactivated == false) {
            const { title, desc, postId } = req.body;
            const updatePost = await posts.findOneAndUpdate({ _id: postId, createdBy: req.user._id }, { title, desc }, { new: true })

            res.json({ message: "edited", post: updatePost })
        }
        else {
            res.json({ message: "can not edit" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.body;
    try {
        if (req.user.blocked == false && req.user.deactivated == false) {
            if (req.user.role == "user") {

                const deletePost = await posts.deleteOne({ _id: postId, createdBy: req.user._id })
                res.json({ message: "deleted", postId })
            }
            else {
                const deletePost = await posts.findOneAndDelete({ _id: postId })
                res.json({ message: "deleted" })
            }
        }
        else {
            res.json({ message: "can not delete it" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}

const getUserePosts = async (req, res) => {

    // try {
    if (req.user.blocked == false && req.user.deactivated == false) {

        if (req.user.role == roles.user) {

            const profilePost = await posts.find({ createdBy: req.user._id, blocked: false })
            res.json({ message: "succ",posts: profilePost })
        }
        else {

            const { userId } = req.query// ع اي اساس 
            if (userId) {
                const findUser = await user.findById({ _id: userId })
                if (findUser) {
                    const profilePost = await posts.find({ createdBy:userId, blocked: false }).populate([{
                        path: 'comments.createdBy',
                        select: "name content",

                    }, {
                        path: 'react.createdBy',
                        select: "name content",

                    }])
                    res.json({ message: "succ",posts: profilePost })
                }
                
                else {

                    res.json({ message: "this user not exist" })
                }
            }
            else{
                const profilePost = await posts.find({ createdBy: req.user._id})
                res.json({ message: "your posts" ,posts: profilePost })

            }
        }
    }
    else {
        res.json({ message: "can not get it" })
    }
    // } catch (error) {
    //  res.json({message:"error",error})
    // }
}


const getAllUserposts = async (req, res) => {
    // let { page, size, search } = req.query
    // try {
        // const { limit, skip } = pagination(page, size)
        // const data = SearchPagination(limit, skip, search, posts, ["title", "desc"])
        const allPosts = await posts.find({blocked:false,}).populate([{
            path: 'createdBy',
            select: "name",
        }, {
            path: 'comments.createdBy',
            select: "name content",

        }, {
            path: 'react.createdBy',
            select: "name content",

        }])
        // هنجرب ونشوف
        console.log( allPosts)
        res.json({ message: "suc", posts: allPosts })
    // } catch (error) {
    //     res.json({ message: "error", error })
    // }
}

const creatcomment = async (req, res) => {
    try {
        if (req.user.blocked == false && req.user.deactivated == false) {
            const { content, postId } = req.body;
           
     const  myPost=  await posts.findOneAndUpdate({ _id: postId})
               myPost.comments.push({content, createdBy:req.user._id})
              
            const findpost = await posts.findOneAndUpdate({ _id: postId}, {comments: myPost.comments} , { new: true }).populate([{
                path: 'createdBy',
                select: "name",
            }, {
                path: 'comments.createdBy',
                select: "name content",
    
            }, {
                path: 'react.createdBy',
                select: "name content",
    
            }])
            // هنجرب ونشوف
            if (!findpost) {
                res.json({ message: "this post not exist" })
            }
            else {
                res.json({ message: "created", post: findpost })
            }

        }
        else {
            res.json({ message: "you can not comment in that" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}

const creatReact = async (req, res) => {
    try {
        if (req.user.blocked == false && req.user.deactivated == false) {
            const { content, postId } = req.body;
            const  myPost=  await posts.findOneAndUpdate({ _id: postId})
            myPost.react.push({content, createdBy:req.user._id})

            const findpost = await posts.findOneAndUpdate({ _id: postId},{react: myPost.react} , { new: true }).populate([{
                path: 'createdBy',
                select: "name",
            }, {
                path: 'comments.createdBy',
                select: "name content",
    
            }, {
                path: 'react.createdBy',
                select: "name content",
    
            }])
            // هنجرب ونشوف
            if (!findpost) {
                res.json({ message: "this post not exist" })
            }
            else {
                res.json({ message: "created", post: findpost })
            }

        }
        else {
            res.json({ message: "you can not comment in that" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}











module.exports = {
    creatpost,
    editpost,
    editpost,
    deletePost,
    getUserePosts,
    getAllUserposts,
    creatcomment,
    creatReact
};