import * as bcrypt from "bcrypt";

export default new (class BcryptMe {
  private saltRounds = 10;
  hashPassword(passwordText: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(passwordText, salt);
    return hash;
  }

  comparePassword(paswordPlantex: string, paswordDb: string): boolean {
    return bcrypt.compareSync(paswordPlantex, paswordDb);
  }
})();
