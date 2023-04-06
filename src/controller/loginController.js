const { compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/user')


const loginCtrl = async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    const failedLoginAttempts = user.failedLoginAttempts + 1;
    const compar = await compare(password, user.password); //TODO: Contraseña!

    const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

    if (compar && user.state == true) { //TODO Contraseña es correcta!
      res.status(200)
      res.send({
        data: user,
        tokenSession
      })
      user.failedLoginAttempts = 0;
      user.save()
      return
    }

    if (!compar) {
      user.failedLoginAttempts = failedLoginAttempts;
      user.save()
      res.status(409)
      res.send({
        error: 'Invalid password'
      })
      return
    }
    if (!user.state) {
      res.status(409)
      res.send({
        error: 'Inactivo'
      })
      return
    }

  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
}







module.exports = { loginCtrl }