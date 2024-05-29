import executeQuery from "../../../database";

export default async function handler(req, res) {
    const { url, userId, userPw, userNm, region, field, nickName, introduce, gender } = req.body;
    console.log("body==> ", req.body);
 
    let query = "";
    let result = null;

    try {
        switch (url) {
         case "duple":
            query = `select user_id from users`;
            console.log(query);
    
            result = await executeQuery(query);
            console.log(result);
            
            res.status(200).json(result);
            break;
          case "register":
            query = `INSERT INTO users (user_id, user_pw, user_name,user_location,user_field,create_date, modify_date) values (?, ?, ?, ?, ?, sysdate(), sysdate())`
            console.log(query);
            result = await executeQuery(query,[userId,userPw,userNm,region,field]);
            console.log("register==>",result);
            if (result.affectedRows > 0) {
                res.status(200).json("성공");
              } else {
                res.status(200).json("실패");
              }
            break;

          case "nnDuple":
            query = `select user_nickName from users`
            console.log(query);
            result = await executeQuery(query);
            console.log(result);
          
            res.status(200).json(result);
            break;
            
          case "addInfo":
            query = `update users set user_nickname = ?, user_gender = ?, user_intro=? where user_id = ?`
            result = await executeQuery(query,[nickName,gender,introduce,userId]);
            console.log("addInfo==>",result);
            if (result.affectedRows > 0) {
                res.status(200).json("성공");
              } else {
                res.status(200).json("실패");
              }
            break;

          case "signIn":
            query = `select user_pw from users where user_id = ?`
            result=await executeQuery(query, [userId])
            console.log("signIn==>", result)
            res.status(200).json(result)



        }
      } catch (err) {
        console.log(err);
      }



}