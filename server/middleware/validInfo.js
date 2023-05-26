module.exports = (req, res, next) => {
    const { user_name, user_email, user_password, user_phone_number } = req.body;

    function validEmail(userEmail) {
        return /\S+@\S+\.\S+/.test(userEmail);
    }

    function validTelephone(userPhone) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/.test(userPhone);
    }

    if (req.path === "/register") {
        if (![user_email, user_name, user_password, user_phone_number].every(Boolean)) { // if any of these are empty
            // console.log("pirmas")
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(user_email)) {
            // console.log("antras")
            return res.status(401).json("Invalid Email");
        }
        else if (!validTelephone(user_phone_number)) {
            // console.log("trecias")
            return res.status(401).json("Invalid Phone Number");
        }
    }
    else if (req.path === "/login") {
        if (![user_email, user_password].every(Boolean)) {
            // console.log(req.body)
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(user_email)) {
            return res.status(401).json("Invalid Email");
        }
    } 
    else if (req.path === "/updateUser") {
        if (![user_email, user_name, user_phone_number].every(Boolean)) { // if any of these are empty
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(user_email)) {
            return res.status(401).json("Invalid Email");
        }
        else if (!validTelephone(user_phone_number)) {
            return res.status(401).json("Invalid Phone Number");
        }
    }

    next();
};