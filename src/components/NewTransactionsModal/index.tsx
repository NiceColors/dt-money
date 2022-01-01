import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outComeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';


import { Container, TransactionTypeContainer, RadioBox } from './styles';



interface newTransactionsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;


}

export function NewTransactionsModal({ isOpen, onRequestClose }: newTransactionsModalProps) {
    const {createTransaction} = useTransactions()
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    const [ type, setType ] = useState('deposit')
    

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')

        onRequestClose()

    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Título" type="text" />
                <input value={amount} onChange={event => setAmount(Number(event.target.value))} placeholder="Preço" type="number" />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={()=> { setType('deposit')}}

                        isActive={type == 'deposit'}
                        activeColors = 'green'
                    
                    >
                        <img src={incomeImg} alt="" />
                        <span>Entrada</span>

                    </RadioBox>
                    <RadioBox 
                        type="button" 
                        onClick={()=> { setType('withdraw')}}
                        isActive={type == 'withdraw'}
                        activeColors = 'red'


                    >
                        <img src={outComeImg} alt="" />
                        <span>Saída</span>

                    </RadioBox>
                </TransactionTypeContainer>

                <input value={category} onChange={event => setCategory(event.target.value)} placeholder="Categoria" type="text" />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}