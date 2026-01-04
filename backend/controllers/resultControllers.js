import Result from "../models/resultModel.js";

 export async function createResult(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { title, technology, level, totalQuestions, correct, wrong } =
      req.body;

    if (
      !technology ||
      !level ||
      totalQuestions === undefined ||
      correct === undefined
    ) {
      return res.status(400).json({ message: "results fields missing" });
    }

    // computing wrong

    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestions) - Number(correct));

    if (!title) {
      return res.status(400).json({ message: "Title not found" });
    }

    const payload = {
      title: String(title).trim(),
      technology,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      user: req.user.id, // for particular user
    };

    const created  =  await Result.create(payload)

    return res.status(200).json({message:"result created",result:created})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"internal server error in result"})
  }
}


export async function listResult(req,res) {
    try {
       if(!req.user || !req.user.id){
        return res.status(401).json({message:"User not listed or authorized"})
       } 

       const {technology} =  req.query
       const query =  {user:req.user.id}

       if(technology && query.toLowerCase()!=='all'){
        query.technology =  technology
       }

       const items =  await  Result.findById(query).sort({createdAt:-1}).lean()
       return res.status(200).json({message:"Result listed",result:items})
    } catch (error) {
            console.log(error)
    return res.status(500).json({message:"internal server error in result listed"})
    }
    
}
