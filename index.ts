import chalk from "chalk";
import inquirer from "inquirer";

const apiLink :string =
"https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuuiz :any = await fetch(data)
    let res = await fetchQuuiz.json()
    return res.results;
}

let data = await fetchData(apiLink);
   let startQuiz = async () =>{
    let score:number = 0;
    //user name
    let Name = await inquirer.prompt({
        type:"input",
        name:"Fname",
        message:"what is  Your Name?"
    })
    for (let i=1; i<=5 ; i++){   

        let answers = [... data[i].incorrect_answers,data [i].
        correct_answer];

        let ans = await inquirer.prompt({
            type:"list",
            name:"Quiz",
            message:data[i].question,
            choices:answers.map((val:any) => val),
        });
        if(ans.Quiz == data [i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.green("Correct Answer"));
        } else {
            console.log(`Correct answer is${chalk.bold.italic.red(data[i].correct_answer)}`
         );
      }
    }
    console.log(`Dear${chalk.green.bold(Name.Fname)},your score is${chalk.red.bold(score

    )}out of ${chalk.red.bold("5")}`);
    

    };

    startQuiz();
   


   

