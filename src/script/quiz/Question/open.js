class Open extends Question{
    constructor(correctanswer, question, explanation){
        super(correctanswer, question, explanation);

        var typebox = document.createElement("input");
        typebox.placeholder = "answer";
        this.questionBlock.insertBefore(typebox, this.undefAnswerBlock);
        //this.questionBlock.appendChild(typebox);
    }
}