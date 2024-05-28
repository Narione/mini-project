import executeQuery from "../../../database";

export default async function handler(req, res) {
    const { url, userId, userPw, userNm, region, field } = req.body;
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
        }
      } catch (err) {
        console.log(err);
      }



}