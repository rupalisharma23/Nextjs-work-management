import bcrypt from 'bcrypt';

export async function genrateSecurePassword(password){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword
    }
    catch(error){
        console.log('error in geratePassword',error)
    }
}

export async function comparePassword(hashedPassword,password){
    try{
        const comparedPassword = await bcrypt.compare(hashedPassword,password)
        return comparedPassword
    }
    catch(error){
        console.log('error in comparePAssword', error)
    }
}