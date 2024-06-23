import ToDo from "./ToDo";
export default function ToDoList({todo}){
    const todoJsx = todo.map((t)=>{
        return <ToDo key={t.id} todo={t} />
    })
    return(
        <div>
            {todoJsx}
        </div>
    );
}