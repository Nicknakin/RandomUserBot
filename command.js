class Command{
    constructor(command, action, description){
        this.command = command;
        this.action = action;
        this.description = description;
        this.toStr = () => `${this.command} : ${this.description}`;
    }
}

module.exports = Command;
