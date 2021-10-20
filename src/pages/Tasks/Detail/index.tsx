import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface ITask{
    id: number;
    nome: string;
    ra: string;
    dataNasc: Date;
    idade: number;
    Matriculado: boolean;
}
 
const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [task, setTask] = useState<ITask>()
 
    function back(){
        history.goBack()
    }
 
    async function findTask(){
        const response = await api.get(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)
    }
 
    useEffect(() => {
        findTask()
    }, [id])
 
    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Detalhes do Cadastro</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />

            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    
                    <Card.Title><strong>Nome: </strong>{task?.nome}
                    </Card.Title>
                    
                    <Card.Text>
                    <strong>Idade: </strong>
                    {task?.idade}
                    <br/>
                    <strong>Ra: </strong>
                    {task?.ra}
                    <br/>
                    <strong>Situação de matrícula: </strong>
                    {task?.Matriculado ? "Matriculado" : "Sim"}
                    <br />
                    <strong>Data de Nascimento: </strong>
                    {moment(task?.dataNasc).format('DD/MM/YYYY')}
                    <br />
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}
 
export default Detail;