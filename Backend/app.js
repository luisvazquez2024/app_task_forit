const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let tasks = [];





app.get('/', (req, res) => {
  res.send('<h1><a href="#">Aplicacion de tareas</a></h1>');
})

//creacion de los endpoints


// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks',(req, res)=>{
	res.json(tasks);
})


app.get('/api/tasks/:id',(req, res)=>{
	
	const {id}=req.params;
	
	const taskId = parseInt(id);
	
	const task = tasks.find(task => task.id==taskId);

	if(task){
		res.json(task)
	}else{
		res.status(404).json({error:"tarea no encontrada"})	
	}
})


//POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks',(req, res)=>{
	
	const {title, description} = req.body;
	

	if(!title){
		return res.status(400).json({error:'title es requerido'})
	}
	const newTask = {
		id:tasks.length + 1,
		title,
		description:description || ' ',
		completed:false,
		createdAt:new Date()
	};
	
	
	tasks.push(newTask);
	res.status(201).json(newTask)
})


//PUT /api/tasks/:id - Actualizar una tarea existente
app.put('/api/tasks/:id',(req, res)=>{
	const {id}= req.params;
	const {title, description,completed} = req.body;
	
	const index = tasks.findIndex(task => task.id == id);
	if(index === -1) return res.status(404).json({error:"tarea no encontrada"});
	
	tasks[index] = {
		id:Number(id),
		title:title || tasks[index].title,
		description:description || tasks[index].description,
		completed:typeof completed === 'boolean'?completed:tasks[index].completed,
		createdAt:new Date()
		};
	res.json(tasks[index]); 
})


//DELETE /api/tasks/:id - Eliminar una tarea

app.delete('/api/tasks/:id',(req, res)=>{
	const {id} = req.params;
	const taskId = parseInt(id);
	
	const largoArrayinicio = tasks.lenght;
	tasks = tasks.filter(task =>task.id != taskId);
	
	if(tasks.length  === largoArrayinicio){
		return res.json({error:"tarea no encontrada"})
	}
	res.status(204).send();
})




app.listen(port, () => {
  console.log(`esta aplicacion esta corriendo en el puerto:  ${port}`)
})
