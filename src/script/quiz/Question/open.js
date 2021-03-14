class Open extends Question{
    constructor(correctanswer, question){
        super(correctanswer, question);

        var typebox = document.createElement("input");
        typebox.placeholder = "answer";
        this.questionBlock.insertBefore(typebox, this.undefAnswerBlock);
        //this.questionBlock.appendChild(typebox);
    }
}