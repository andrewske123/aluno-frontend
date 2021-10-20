import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
 
interface ITask{
    nome: string;
   
    ra: string;

}
 
const Tasks: React.FC = () => {
 
    const history = useHistory()
    const { id } = useParams<{ id: string }>()

    const [model, setModel] = useState<ITask>({
        nome: '',

        ra: ''   
    })

  



    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
 
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        
        if (id != undefined) {
            const response = await api.put(`/tasks/${id}`, model)
        }
        else{
            const response = await api.post('/tasks', model)
        }
        back()
    }

    function back(){
        history.goBack()
    }

    



    return (
        
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Novo cadastro</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label >Idade</Form.Label>
                        <Form.Control
                            min="0"
                            type="number"
                            name="idade"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ra</Form.Label>
                        <Form.Control
                            type="text"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataNasc"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
 
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
 
export default Tasks;